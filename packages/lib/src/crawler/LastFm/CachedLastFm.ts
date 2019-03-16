import LastFm from './LastFm';
import { Artist, Track, TrackSearchResult } from './typings';
import Cache from '../../cache/Cache';
import CacheStorage from '../../cache/storage/CacheStorage';
import Logger from '../../logger/Logger';
import { md5Hasher } from '../../cache/Hasher';

export default class CachedLastFm {
  private service;
  private cache: Cache<any>;

  public constructor(
    apiKey: string,
    storage: CacheStorage,
    logger: Logger = null
  ) {
    this.service = new LastFm(apiKey);
    this.cache = new Cache<any>(storage, logger);
  }

  public artistSearch = async (artist: string): Promise<Artist[]> => {
    const memo = this.cache.memoize(
      a => this.service.artistSearch(a),
      md5Hasher
    );
    return (await memo(artist)).data;
  };

  public trackSearch = async (
    track: string,
    artist: string = null
  ): Promise<TrackSearchResult[]> => {
    const memo = this.cache.memoize(
      (t, a) => this.service.trackSearch(t, a),
      md5Hasher
    );
    return (await memo(track, artist)).data;
  };

  public artistInfo = async (mbid: string): Promise<Artist> => {
    const memo = this.cache.memoize(m => this.service.artistInfo(m), md5Hasher);
    return (await memo(mbid)).data;
  };

  public artistInfoByName = async (artist: string): Promise<Artist> => {
    const memo = this.cache.memoize(
      a => this.service.artistInfoByName(a),
      md5Hasher
    );
    return (await memo(artist)).data;
  };

  public trackInfo = async (mbid: string): Promise<Track> => {
    const memo = this.cache.memoize(m => this.service.trackInfo(m), md5Hasher);
    return (await memo(mbid)).data;
  };

  public trackInfoByTitle = async (
    track: string,
    artist: string = null
  ): Promise<Track> => {
    const memo = this.cache.memoize(
      (t, a) => this.service.trackInfoByTitle(t, a),
      md5Hasher
    );
    return (await memo(track, artist)).data;
  };
}
