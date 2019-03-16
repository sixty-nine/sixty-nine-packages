import { Logger, NullLogger } from '../logger';
import CacheStorage from './storage/CacheStorage';
import { defaultHasher, HashFn } from './Hasher';

/**
 * Type wrapping the results of Cache.Get.
 *
 * The actual results are in *data* while *origin* indicates whether they
 * come from the cache or from the live version.
 */
export interface CacheResult<T> {
  origin: 'cache' | 'live';
  data: T;
}

export type MemoizedFn<T> = (...params) => Promise<T>;

/**
 * The generic cache interface.
 *
 * The type param CachedType indicates the type of the cached data.
 */
export default class Cache<CachedType> {
  private logger: Logger;
  private storage: CacheStorage;

  /**
   * The construction of a cache instance requires a CacheStorage object
   * to persist the data.
   *
   * Optionally a Logger compliant class can be specified.
   * By default a NullLogger will be used.
   */
  public constructor(storage: CacheStorage, logger: Logger = null) {
    this.storage = storage;
    this.logger = null !== logger ? logger : NullLogger;
  }

  /**
   * Allow to inject a logger to override the one from the constructor.
   */
  public setLogger = (logger: Logger) => (this.logger = logger);

  public memoize = (
    fetch: MemoizedFn<CachedType>,
    hasher: HashFn = null,
    ttlMs: number = 0
  ): ((...params) => Promise<CacheResult<CachedType>>) => {
    return async (...params) => {
      const hash = null !== hasher ? hasher : defaultHasher;
      const key = hash(params);
      this.logger.debug(`CACHE CHECK: ${key}`);

      if (await this.storage.has(key)) {
        this.logger.debug(`CACHE HIT: ${key}`);
        return { origin: 'cache', data: await this.storage.get(key) };
      }

      this.logger.debug(`CACHE FETCH: ${key}`);
      const live = await fetch(params);

      if (live) {
        this.logger.debug(`CACHE STORE: ${key}`);
        await this.storage.set(key, live, ttlMs);
      }

      return { origin: 'live', data: live };
    };
  };
}
