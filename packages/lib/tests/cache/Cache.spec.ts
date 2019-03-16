// tslint:disable-next-line
import test from 'ava';
import Cache from '../../src/cache/Cache';
import SimpleCacheStorage from '../../src/cache/storage/SimpleCacheStorage';
import { ArrayLogger } from '@sixty-nine-packages/logger';
import { identHasher } from '../../src/cache/Hasher';

const fn = async (s: string): Promise<string> => new Promise(resolve => resolve('-->' + s));

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

test('Memoize', async t => {
  const logger = new ArrayLogger();
  const storage = new SimpleCacheStorage();
  const cache = new Cache<string>(storage);
  const memo = await cache.memoize(fn, identHasher);
  cache.setLogger(logger);

  const res1 = await memo('foobar');
  const res2 = await memo('foobar');
  t.is(res1.origin, 'live');
  t.is(res2.origin, 'cache');
  t.is(res1.data, '-->foobar');
  t.is(res2.data, res1.data);

  t.deepEqual(
    [
      { level: 'debug', message: 'CACHE CHECK: foobar' },
      { level: 'debug', message: 'CACHE FETCH: foobar' },
      { level: 'debug', message: 'CACHE STORE: foobar' },
      { level: 'debug', message: 'CACHE CHECK: foobar' },
      { level: 'debug', message: 'CACHE HIT: foobar' }
    ],
    logger.getLog(),
  );

  const res3 = await memo('foobar1');
  t.is(res3.origin, 'live');
  t.is(res3.data, '-->foobar1');
});

test('Memoize with TTL', async t => {
  const logger = new ArrayLogger();
  const storage = new SimpleCacheStorage();
  const cache = new Cache<string>(storage, logger);
  const memo = await cache.memoize(fn, null, 10);

  const res1 = await memo('foobar');
  const res2 = await memo('foobar');
  await sleep(10);
  const res3 = await memo('foobar');
  t.is(res1.origin, 'live');
  t.is(res2.origin, 'cache');
  t.is(res3.origin, 'live');
  t.is(res1.data, '-->foobar');
  t.is(res2.data, res1.data);
  t.is(res3.data, res1.data);
});

test('TTL zero is forever', async t => {
  const logger = new ArrayLogger();
  const storage = new SimpleCacheStorage();
  const cache = new Cache<string>(storage, logger);
  const memo = await cache.memoize(fn, null, 0);

  const res1 = await memo('foobar');
  await sleep(10);
  const res2 = await memo('foobar');
  t.is(res1.origin, 'live');
  t.is(res2.origin, 'cache');
  t.is(res1.data, '-->foobar');
  t.is(res2.data, res1.data);
});

