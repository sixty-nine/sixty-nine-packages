// tslint:disable-next-line
import test from 'ava';

import SimpleCacheStorage from '../../src/cache/storage/SimpleCacheStorage';
import RedisCacheStorage from '../../src/cache/storage/RedisCacheStorage';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const addRemoveTest = async (t, storage) => {
  await storage.remove('foobar');
  t.false(await storage.has('foobar'));

  await storage.set('foobar', 'baz');
  t.true(await storage.has('foobar'));

  const value = await storage.get('foobar');
  t.is('baz', value);

  await storage.remove('foobar');
  t.false(await storage.has('foobar'));

  const inexistent = await storage.get('foobar');
  t.is(null, inexistent);
};

const ttlTest = async (t, storage) => {
  await storage.remove('foobar');
  t.false(await storage.has('foobar'));

  await storage.set('foobar', 'baz', 1);
  t.true(await storage.has('foobar'));
  await sleep(10);
  t.false(await storage.has('foobar'));
};

addRemoveTest.title = (providedTitle = '', storage) => `${storage.constructor.name}: ${providedTitle}`;
ttlTest.title = (providedTitle = '', storage) => `${storage.constructor.name}: ${providedTitle}`;

const simple = new SimpleCacheStorage<string>();
test('Add and remove a key without TTL works', addRemoveTest, simple);
test('Entries expire after their TTL', ttlTest, simple);

const redis = new RedisCacheStorage();
test('Add and remove a key without TTL works', addRemoveTest, redis);
test('Entries expire after their TTL', ttlTest, redis);
