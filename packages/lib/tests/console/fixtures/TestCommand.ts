import Option from '../../../src/console/Command/Option';
import OutputInterface from '../../../src/console/Output/OutputInterface';
import Command from '../../../src/console/Command/Command';
import InputInterface from '../../../src/console/Input/InputInterface';
import Argument from '../../../src/console/Command/Argument';

export default class TestCommand extends Command {
  constructor() {
    super('test', 'This is a <info>test command</info>.');
    this.addArgument(new Argument('arg1', 'First arg', Argument.ARGUMENT_REQUIRED));
    // tslint:disable:no-bitwise
    this.addOption(new Option('opt1', 'Option 1', Option.OPTION_REQUIRED | Option.OPTION_NUMERIC));
    // tslint:enable
    this.addOption(new Option('opt2', 'Option 2', Option.OPTION_BOOLEAN));
    this.addOption(new Option('opt3', 'Option 3'));
  }

  public execute = async (_input: InputInterface, _output: OutputInterface) => {
    _output.write('foobar');
  }
}
