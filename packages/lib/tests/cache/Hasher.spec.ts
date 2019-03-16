// tslint:disable-next-line
import test from 'ava';
import { identHasher, md5Hasher, prefixedHasher } from '../../src/cache/Hasher';
import md5 from '../../src/utils/MD5';

test('md5Hasher', t => {
  t.is(md5Hasher('foobar'), md5(JSON.stringify('foobar')));
});

test('identHasher', t => {
  t.is(identHasher('foobar'), 'foobar');
});

test('prefixedHasher', t => {
  t.is(prefixedHasher('prefix-', identHasher)('foobar'), 'prefix-foobar');
  t.is(prefixedHasher('prefix-', md5Hasher)('foobar'), `prefix-${md5Hasher('foobar')}`);
});
