import redis from 'redis';
import CacheStorage from './CacheStorage';
import { Logger, NullLogger } from '../../logger';
import { promisify } from 'util';

/**
 * An implementation of CacheStorage using Redis as backend.
 */
export default class RedisCacheStorage implements CacheStorage {
  private logger: Logger;
  private client;
  private getAsync;
  private existsAsync;
  private delAsync;

  /**
   * Connect to Redis.
   *
   * The *host* and *port* of the server can be specified.
   * Leave blank to connect to localhost.
   *
   * Optionally pass in a logger.
   */
  public constructor(host?, port?, logger: Logger = null) {
    this.logger = null !== logger ? logger : NullLogger;

    this.client = redis.createClient(port, host);
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.existsAsync = promisify(this.client.exists).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);

    this.client.on('connect', () => {
      this.logger.info('REDIS: client connected');
    });

    this.client.on('error', err => {
      this.logger.error('REDIS: Something went wrong ' + err);
    });
  }

  /**
   * Allow to inject a logger to override the one from the constructor.
   */
  public setLogger = (logger: Logger) => (this.logger = logger);

  /** {@inheritDoc} */
  public get = async (key: string): Promise<any> => {
    const result = await this.getAsync(key);
    return JSON.parse(result);
  };

  public set = async (key: string, data: any, ttlMs: number = 0) => {
    await this.client.set(key, JSON.stringify(data));
    if (ttlMs !== 0) {
      this.client.expire(key, ttlMs / 1000);
    }
  };

  public has = async (key: string): Promise<boolean> =>
    1 === (await this.existsAsync(key));

  public remove = async (key: string) => this.delAsync(key);
}
