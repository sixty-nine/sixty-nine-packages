/**
 * Interface for the storage of the cache.
 *
 * Implementations must allow to persist data for the cache.
 */
export default interface CacheStorage {
  /**
   * Return true if the storage has the given *key*.
   */
  has: (key: string) => Promise<boolean>;

  /**
   * Read and return the *data* designed by *key*.
   *
   * The implementation **should** be async.
   */
  get: (key: string) => Promise<any>;

  /**
   * Store the given *data* under the given *key*.
   *
   * The implementation **can** be async.
   */
  set: (key: string, data: any, ttlMs?: number) => void;

  /**
   * Remove the given *key* from the storage if present.
   * Otherwise does nothing.
   */
  remove: (key: string) => void;
}
