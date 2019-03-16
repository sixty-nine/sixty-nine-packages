// tslint:disable-next-line
import test from 'ava';
import ArrayLogger from '../../src/logger/ArrayLogger';

test('Logs proper messages and levels', async t => {
  const l = new ArrayLogger();
  l.critical('critical');
  l.debug('debug');
  l.error('error');
  l.info('info');
  l.trace('trace');
  l.verbose('verbose');
  l.warn('warn');

  const array = l.getLog();

  t.is(7, array.length);
  t.deepEqual({ level: 'critical', message: 'critical' }, array[0]);
  t.deepEqual({ level: 'debug', message: 'debug' }, array[1]);
  t.deepEqual({ level: 'error', message: 'error' }, array[2]);
  t.deepEqual({ level: 'info', message: 'info' }, array[3]);
  t.deepEqual({ level: 'trace', message: 'trace' }, array[4]);
  t.deepEqual({ level: 'verbose', message: 'verbose' }, array[5]);
  t.deepEqual({ level: 'warn', message: 'warn' }, array[6]);
});
