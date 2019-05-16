import Cache from './cache/Cache';
import SimpleCacheStorage from './cache/storage/SimpleCacheStorage';
import RedisCacheStorage from './cache/storage/RedisCacheStorage';
import { identHasher, md5Hasher, prefixedHasher } from './cache/Hasher';
import md5 from './utils/MD5';
import NullLogger from './logger/NullLogger';
import ArrayLogger from './logger/ArrayLogger';
import IntelLogger from './logger/IntelLogger';
import WikiLyrics from "./crawler/WikiLyrics/WikiLyrics";
import CachedWikiLyrics from "./crawler/WikiLyrics/CachedWikiLyrics";
import CachedLastFm from "./crawler/LastFm/CachedLastFm";
import LastFm from "./crawler/LastFm/LastFm";

import App from './console/App';
import StrUtils from './console/StrUtils';
import Argument from './console/Command/Argument';
import Command from './console/Command/Command';
import Option from './console/Command/Option';
import ChalkOutputStyle from './console/Formatter/ChalkOutputStyle';
import DefaultFormatter from './console/Formatter/DefaultFormatter';
import Formatter from './console/Formatter/Formatter';
import OutputStyle from './console/Formatter/OutputStyle';
import CLIInput from './console/Input/CLIInput';
import StringInput from './console/Input/StringInput';
import StringOutput from './console/Output/StringOutput';


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
  },
  crawler: {
    WikiLyrics,
    CachedWikiLyrics,
    LastFm,
    CachedLastFm,
  },
  console: {
    App,
    StrUtils,
    Argument,
    Command,
    Option,
    ChalkOutputStyle,
    DefaultFormatter,
    Formatter,
    OutputStyle,
    CLIInput,
    StringInput,
    StringOutput
  },
};

export default modules;
