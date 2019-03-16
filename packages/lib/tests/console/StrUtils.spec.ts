// tslint:disable-next-line
import test from 'ava';
import StrUtils from '../../src/console/StrUtils';

test('rpad', t => {
  t.is('foobar....', StrUtils.rpad('foobar', '.', 10));
  t.is('foobar', StrUtils.rpad('foobar', '.', 6));
  t.is('foobar', StrUtils.rpad('foobar', '.', 3));
});

test('center', t => {
  t.is('....foobar....', StrUtils.center('foobar', '.', 14));
  t.is('..foobar...', StrUtils.center('foobar', '.', 11));
  t.is('foobar', StrUtils.center('foobar', '.', 6));
  t.is('foobar', StrUtils.center('foobar', '.', 4));
});
