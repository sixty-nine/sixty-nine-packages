import Cache from './cache/Cache';
import SimpleCacheStorage from './cache/storage/SimpleCacheStorage';
import RedisCacheStorage from './cache/storage/RedisCacheStorage';
import { identHasher, md5Hasher, prefixedHasher } from './cache/Hasher';
import md5 from './utils/MD5';
import NullLogger from './logger/NullLogger';
import ArrayLogger from './logger/ArrayLogger';
import IntelLogger from './logger/IntelLogger';

const modules = {
  cache: {
    Cache,
    hashers: {
      identHasher,
      md5Hasher,
      prefixedHasher
    },
    storage: {
      RedisCacheStorage,
      SimpleCacheStorage
    }
  },
  logger: {
    ArrayLogger,
    IntelLogger,
    NullLogger
  },
  utils: {
    md5
  }
};

export default modules;
