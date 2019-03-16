// tslint:disable-next-line
import test from 'ava';
  import SimpleCacheStorage from '../../src/cache/storage/SimpleCacheStorage';
import { ArrayLogger } from '../../src/logger';
import WikiLyrics from '../../src/crawler/WikiLyrics/WikiLyrics';
import CachedWikiLyrics from '../../src/crawler/WikiLyrics/CachedWikiLyrics';

const assertContainsSearchResults = (t, res) => {
  t.true(Array.isArray(res));

  res.forEach(item => {
    t.true('artist' in item);
    t.true('title' in item);
    t.true('link' in item);

    t.is('string', typeof item.artist);
    t.is('string', typeof item.link);

    // Title can be undefined
    t.true('string' === typeof item.title || undefined === item.title);
  });
};

test('Search lyrics', async t => {
  const service = new WikiLyrics();
  const title = 'Renaud dès que le vent soufflera';
  const page1 = await service.searchLyrics(title);
  const page2 = await service.searchLyrics(title, 2);

  assertContainsSearchResults(t, page1);
  assertContainsSearchResults(t, page2);
  t.notDeepEqual(page1, page2);
});

test('Fetch lyrics', async t => {
  const url = 'http://lyrics.wikia.com/wiki/Renaud:D%C3%A8s_Que_Le_Vent_Soufflera...';
  const expectedRegEx =
    `^C'est pas l'homme qui prend la mer\n` +
    `C'est la mer qui prend l'homme, Tatatin\n` +
    `Moi la mer elle m'a pris\n` +
    `Je m' souviens un Mardi\n`
  ;
  const service = new WikiLyrics();
  const res = await service.fetchLyrics(url);

  t.is('string', typeof res);
  t.regex(res, new RegExp(expectedRegEx));
});

test('Cached fetch', async t => {
  const storage = new SimpleCacheStorage();
  const logger= new ArrayLogger();
  const service = new CachedWikiLyrics(storage, logger);
  const url = 'http://lyrics.wikia.com/wiki/Renaud:D%C3%A8s_Que_Le_Vent_Soufflera...';
  const res1 = await service.fetchLyrics(url);
  const res2 = await service.fetchLyrics(url);
  const logs = logger.getLog();

  t.deepEqual(res1, res2);
  t.is(5, logs.length);
  t.regex(logs[0].message, /^CACHE CHECK/);
  t.regex(logs[1].message, /^CACHE FETCH/);
  t.regex(logs[2].message, /^CACHE STORE/);
  t.regex(logs[3].message, /^CACHE CHECK/);
  t.regex(logs[4].message, /^CACHE HIT/);
});

test('Cached search', async t => {
  const storage = new SimpleCacheStorage();
  const logger= new ArrayLogger();
  const service = new CachedWikiLyrics(storage, logger);
  const title = 'Renaud dès que le vent soufflera';
  const res1 = await service.searchLyrics(title);
  const res2 = await service.searchLyrics(title);
  const logs = logger.getLog();

  t.deepEqual(res1, res2);
  t.is(5, logs.length);
  t.regex(logs[0].message, /^CACHE CHECK/);
  t.regex(logs[1].message, /^CACHE FETCH/);
  t.regex(logs[2].message, /^CACHE STORE/);
  t.regex(logs[3].message, /^CACHE CHECK/);
  t.regex(logs[4].message, /^CACHE HIT/);
});
