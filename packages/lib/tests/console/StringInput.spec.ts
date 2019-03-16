// tslint:disable-next-line
import test from 'ava';
import StringInput from '../../src/console/Input/StringInput';

test('StringInput _options', t => {
  const input = new StringInput('a b -c --d value');

  t.deepEqual(['c', 'd'], input.getOptions());
  t.is(true, input.hasOption('c'));
  t.is(true, input.getOption('c'));
  t.is(true, input.hasOption('d'));
  t.is('value', input.getOption('d'));
  t.is(false, input.hasOption('foobar'));
  const res = t.throws(() => input.getOption('foobar'));
  t.is('Unknown option "foobar"', res.message);
});

test('StringInput _arguments', t => {
  const input = new StringInput('a b -c --d value');

  t.deepEqual(['a', 'b'], input.getArguments());
  t.is('a', input.getFirstArgument());
  t.is(true, input.hasArgument(0));
  t.is(true, input.hasArgument(1));
  t.is(false, input.hasArgument(2));
  t.is(false, input.hasArgument(3));
  t.is('a', input.getArgument(0));
  t.is('b', input.getArgument(1));
  const res = t.throws(() => input.getArgument(2));
  t.is('Unknown argument #2', res.message);
});

test('StringInput no param', t => {
  const input = new StringInput('');
  let res;

  t.deepEqual([], input.getOptions());
  t.is(false, input.hasOption('c'));
  t.is(false, input.hasOption('d'));
  res = t.throws(() => input.getOption('c'));
  t.is('Unknown option "c"', res.message);

  t.deepEqual([], input.getArguments());
  t.is(null, input.getFirstArgument());
  t.is(false, input.hasArgument(0));
  res = t.throws(() => input.getArgument(0));
  t.is('Unknown argument #0', res.message);
});
