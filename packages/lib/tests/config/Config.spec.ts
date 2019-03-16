// tslint:disable-next-line
import test from 'ava';
import Config from '../../src/config/Config';

test('Config', t => {

  const c = new Config('.env.test');

  t.is(c.get('FOO'), 'BAR');

  process.env.FOO = 'BAZ';

  t.is(c.get('FOO'), 'BAZ');

  t.is(c.get('FOOBAR'), undefined);
});
