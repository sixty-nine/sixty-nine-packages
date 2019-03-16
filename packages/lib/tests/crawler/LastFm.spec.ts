// tslint:disable-next-line
import test from 'ava';
import LastFm from '../../src/crawler/LastFm/LastFm';
import CachedLastFm from '../../src/crawler/LastFm/CachedLastFm';
import Config from '../../src/config/Config';
import { ArrayLogger } from '../../src/logger';
import SimpleCacheStorage from '../../src/cache/storage/SimpleCacheStorage';

const config = new Config();
const apiKey = config.get('LAST_FM_API_KEY');
const service = new LastFm(apiKey);

test('Artist search and info', async t => {
  const mbid = '618b6900-0618-4f1e-b835-bccb17f84294';
  const name = 'Eric Clapton';

  const list = await service.artistSearch(name);
  t.true(Array.isArray(list));
  t.true(0 < list.length);

  const artist = list[0];
  t.is(mbid, artist.mbid);
  t.is(name, artist.name);

  const artist1 = await service.artistInfo(mbid);
  const artist2 = await service.artistInfoByName(name);
  t.deepEqual(artist1, artist2);
});

test('Track search and info', async t => {
  const artist = 'The Platters';
  const title = 'Only You';
  const mbid = 'ab714fb2-8215-466c-a2bb-b9cc70baebbf';

  const list = await service.trackSearch(title, artist);
  t.true(Array.isArray(list));
  t.true(0 < list.length);

  const track = list[0];
  t.is(mbid, track.mbid);
  t.is(title, track.name);
  t.is(artist, track.artist);

  const track1 = await service.trackInfo(mbid);
  t.is(artist, track1.artist.name);
  t.is(title, track1.name);

  const track2 = await service.trackInfoByTitle(title, artist);
  t.is(track1.mbid, track2.mbid);
});

test('Cached artist search', async t => {
  const storage = new SimpleCacheStorage();
  const logger= new ArrayLogger();
  const cachedService = new CachedLastFm(apiKey, storage, logger);
  const name = 'Eric Clapton';
  const mbid = '618b6900-0618-4f1e-b835-bccb17f84294';
  const res1 = await cachedService.artistSearch(name);
  const res2 = await cachedService.artistSearch(name);
  const logs = logger.getLog();

  t.deepEqual(res1, res2);
  t.is(mbid, res1[0].mbid);
  t.is(5, logs.length);
  t.regex(logs[0].message, /^CACHE CHECK/);
  t.regex(logs[1].message, /^CACHE FETCH/);
  t.regex(logs[2].message, /^CACHE STORE/);
  t.regex(logs[3].message, /^CACHE CHECK/);
  t.regex(logs[4].message, /^CACHE HIT/);
});

test('Cached track search', async t => {
  const storage = new SimpleCacheStorage();
  const logger= new ArrayLogger();
  const cachedService = new CachedLastFm(apiKey, storage, logger);
  const artist = 'The Platters';
  const title = 'Only You';
  const mbid = 'ab714fb2-8215-466c-a2bb-b9cc70baebbf';

  const res1 = await cachedService.trackSearch(title, artist);
  const res2 = await cachedService.trackSearch(title, artist);
  const logs = logger.getLog();

  t.deepEqual(res1, res2);
  t.is(mbid, res2[0].mbid);
  t.is(5, logs.length);
  t.regex(logs[0].message, /^CACHE CHECK/);
  t.regex(logs[1].message, /^CACHE FETCH/);
  t.regex(logs[2].message, /^CACHE STORE/);
  t.regex(logs[3].message, /^CACHE CHECK/);
  t.regex(logs[4].message, /^CACHE HIT/);
});
