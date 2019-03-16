// tslint:disable-next-line
import test from 'ava';
import App from '../../src/console/App';
import TestCommand from './fixtures/TestCommand';
import StringInput from '../../src/console/Input/StringInput';
import StringOutput from '../../src/console/Output/StringOutput';

const createApp = (): App => {
  const app = new App('Test App');
  app.add(new TestCommand());
  return app;
};

test(
  'Has unique command names',
  t => {
    const res = t.throws(() => createApp().addCommands([
      new TestCommand(), new TestCommand(),
    ]));
    t.is(res.message, 'Command already exist');
  }
);

test('Does not accept invalid commands', async t => {
  const output = new StringOutput();
  createApp().run(new StringInput('foobar'), output);
  t.is('<error>Command foobar does not exist</error>\n', output.content);
});

test('Shows errors', async t => {
  const output = new StringOutput();
  createApp().run(new StringInput('test'), output);
  t.is('<error>Argument arg1 is required</error>\n', output.content);
});

test('Shows help', async t => {
  const expected = `
<notice>Usage:</notice>

    test arg1 --opt1 [--opt2] [--opt3]

<notice>Arguments:</notice>

    <info>arg1</info>	First arg <notice>REQUIRED</notice>

<notice>Options:</notice>

    <info>--opt1</info>	Option 1 <notice>REQUIRED</notice>
    <info>--opt2</info>	Option 2 
    <info>--opt3</info>	Option 3 

This is a <info>test command</info>.

`;
  const output = new StringOutput();
  createApp().run(new StringInput('help test'), output);
  t.is(expected, output.content);
});

test('Must run', async t => {
  const app = createApp();
  t.is(1, app.commands.length);
  t.is('test', app.commands[0].name);
  t.is('function', typeof app.commands[0].execute);

  const output = new StringOutput();
  app.run(new StringInput('test 123 --opt1 123'), output);
  t.is('foobar', output.content);
});
