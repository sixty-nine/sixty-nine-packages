import Cache, { MemoizedFn } from '../../cache/Cache';
import CacheStorage from '../../cache/storage/CacheStorage';
import Logger from '../../logger/Logger';
import WikiLyrics, { SearchResults } from './WikiLyrics';
import { md5Hasher } from '../../cache/Hasher';

export default class CachedWikiLyrics {
  private service = new WikiLyrics();
  private fetchMemo: MemoizedFn<any>;
  private searchMemo: MemoizedFn<any>;

  public constructor(storage: CacheStorage, logger: Logger = null) {
    const cache = new Cache<any>(storage, logger);
    this.fetchMemo = cache.memoize(
      url => this.service.fetchLyrics(url),
      md5Hasher
    );
    this.searchMemo = cache.memoize(
      (term, page = 1) => this.service.searchLyrics(term, page),
      md5Hasher
    );
  }

  public fetchLyrics = async (url: string): Promise<string> =>
    (await this.fetchMemo(url)).data;

  public searchLyrics = async (
    term: string,
    page: number = 1
  ): Promise<SearchResults[]> => (await this.searchMemo(term, page)).data;
}
