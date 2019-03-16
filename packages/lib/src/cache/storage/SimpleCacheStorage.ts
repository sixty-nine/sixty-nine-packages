import CacheStorage from './CacheStorage';

interface CacheEntry<T> {
  data: T;
  expires: boolean | number;
}

interface Storage<T> {
  [key: string]: CacheEntry<T>;
}

/**
 * A simple implementation of CacheStorage that will hold the whole data in
 * an in-memory array.
 *
 * Needless to say this might not be performing very well.
 */
export default class SimpleCacheStorage<T> implements CacheStorage {
  protected storage: Storage<T> = {};

  public has = async (key: string): Promise<boolean> => {
    if (key in this.storage) {
      const entry: CacheEntry<T> = this.storage[key];
      return !entry.expires || entry.expires >= Date.now();
    }
    return false;
  };

  public get = async (key: string): Promise<any> => {
    if (!(await this.has(key))) {
      return null;
    }
    const entry: CacheEntry<T> = this.storage[key];
    return entry.data;
  };

  public set = async (key: string, data: any, ttlMs: number = 0) => {
    this.storage[key] = {
      data,
      expires: ttlMs === 0 ? false : Date.now() + ttlMs
    };
  };

  public remove = async (key: string) =>
    Reflect.deleteProperty(this.storage, key);
}
