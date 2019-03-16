// tslint:disable-next-line
import test from 'ava';
import TestCommand from './fixtures/TestCommand';
import Option from '../../src/console/Command/Option';
import Argument from '../../src/console/Command/Argument';
import { expectError, validateCmdArgs } from './utils/TestUtils';
import Command from '../../src/console/Command/Command';
import StringOutput from '../../src/console/Output/StringOutput';

test('Can take no argument', t => {
  const c = new Command('test');
  t.is(true, validateCmdArgs(c, ''))
});

test(
  'Has unique arguments',
  t => expectError(t,
    () => new Command('test')
      .addArgument(new Argument('arg1'))
      .addArgument(new Argument('arg1')),
    'Argument arg1 already exists'
  )
);

test('Can take more required arguments', t => {
  const c = new Command('test')
    .addArgument(new Argument('arg1', '', Argument.ARGUMENT_REQUIRED))
    .addArgument(new Argument('arg2', '', Argument.ARGUMENT_REQUIRED))
  ;
  t.is(true, validateCmdArgs(c, '1 2'))
});

test('Can take required arguments followed by optional arguments', t => {
  const c = new Command('test')
    .addArgument(new Argument('arg1', '', Argument.ARGUMENT_REQUIRED))
    .addArgument(new Argument('arg2', '', Argument.ARGUMENT_REQUIRED))
    .addArgument(new Argument('arg3', '', Argument.ARGUMENT_OPTIONAL))
    .addArgument(new Argument('arg4', '', Argument.ARGUMENT_OPTIONAL))
  ;
  t.is(true, validateCmdArgs(c, '1 2'))
});

test(
  'Cannot take required arguments after optional arguments',
  t => expectError(t,
    () => new Command('test')
      .addArgument(new Argument('arg1', '', Argument.ARGUMENT_REQUIRED))
      .addArgument(new Argument('arg2', '', Argument.ARGUMENT_OPTIONAL))
      .addArgument(new Argument('arg3', '', Argument.ARGUMENT_REQUIRED)),
    'Required arguments cannot come after optional'),
);

test(
  'Has unique options',
  t => expectError(t,
    () => new Command('test')
      .addOption(new Option('opt1'))
      .addOption(new Option('opt1')),
    'Option --opt1 already exists'
  )
);

test(
  'Does not accept missing required arguments',
  t => expectError(t,
    () => validateCmdArgs(new TestCommand(), ''),
    'Argument arg1 is required'
  ),
);

test(
  'Does not accept additional arguments',
  t => expectError(t,
    () => validateCmdArgs(new TestCommand(), 'arg1 arg2 --opt1 4'),
    'Too many arguments'
  )
);

test(
  'Does not accept missing required options',
  t => expectError(t,
    () => validateCmdArgs(new TestCommand(), 'arg1'),
    'Option --opt1 is required')
);

test(
  'Does not accept strings for numerical options',
  t => expectError(t,
    () => validateCmdArgs(new TestCommand(), 'arg1 --opt1 ABC'),
    'Option --opt1 must be numeric')
);

test(
  'Numerical options must have a value',
  t => expectError(t,
    () => validateCmdArgs(new TestCommand(), 'arg1 --opt1'),
    'Option --opt1 must be numeric')
);

test(
  'Boolean options cannot have a value',
  t => expectError(t,
    () => validateCmdArgs(new TestCommand(), 'arg1 --opt1 1 --opt2 2'),
    'Option --opt2 cannot have a value')
);

test(
  'String options must have a value',
  t => expectError(t,
    () => validateCmdArgs(new TestCommand(), 'arg1 --opt1 1 --opt3'),
    'Option --opt3 must have a value')
);

test('Should display getHelp', t => {
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
  new TestCommand().getHelp(output);
  t.is(expected, output.content);

});
