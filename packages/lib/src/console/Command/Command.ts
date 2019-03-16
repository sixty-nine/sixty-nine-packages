import Argument from './Argument';
import CommandInterface from './CommandInterface';
import InputInterface from '../Input/InputInterface';
import Option from './Option';
import OutputInterface from '../Output/OutputInterface';

export default class Command implements CommandInterface {
  protected _name: string;
  protected _description: string;
  protected _arguments: Argument[] = [];
  protected _options: Option[] = [];

  constructor(name: string, descrption: string = '') {
    this._name = name;
    this._description = descrption;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  public validate = (input: InputInterface): boolean => {
    this.checkArgumentsCount(input);
    this.checkRequiredArguments(input);
    this._options.forEach(opt => opt.validateValue(input));
    return true;
  };

  public execute = async (_input: InputInterface, _output: OutputInterface) => {
    // Do nothing
  };

  public getHelp = (output: OutputInterface) => {
    output.writeLn(`
<notice>Usage:</notice>

    ${this.name} \
${this._arguments
  .map(arg => (arg.isRequired ? `${arg.name}` : `[${arg.name}]`))
  .join(' ')} \
${this._options
  .map(opt => (opt.isRequired ? `--${opt.name}` : `[--${opt.name}]`))
  .join(' ')}

<notice>Arguments:</notice>
`);

    this._arguments.forEach(arg =>
      output.writeLn(
        `    <info>${arg.name}</info>` +
          `\t${arg.description} ` +
          `${arg.isRequired ? '<notice>REQUIRED</notice>' : ''}`
      )
    );

    output.writeLn(`
<notice>Options:</notice>
`);
    this._options.forEach(opt =>
      output.writeLn(
        `    <info>--${opt.name}</info>` +
          `\t${opt.description} ` +
          `${opt.isRequired ? '<notice>REQUIRED</notice>' : ''}`
      )
    );

    if (this._description !== '') {
      output.writeLn().writeLn(this._description);
    }

    output.writeLn();
  };

  public addOption = (option: Option): Command => {
    if (this._options.find(opt => opt.name === option.name)) {
      throw new Error(`Option --${option.name} already exists`);
    }
    this._options.push(option);
    return this;
  };

  public addArgument = (argument: Argument): Command => {
    if (this._arguments.find(arg => arg.name === argument.name)) {
      throw new Error(`Argument ${argument.name} already exists`);
    }
    if (
      argument.isRequired &&
      undefined !== this._arguments.find(a => !a.isRequired)
    ) {
      throw new Error('Required arguments cannot come after optional');
    }
    this._arguments.push(argument);
    return this;
  };

  private checkArgumentsCount = (input: InputInterface) => {
    if (input.getArguments().length > this._arguments.length) {
      throw new Error('Too many arguments');
    }
  };

  private checkRequiredArguments = (input: InputInterface) => {
    this._arguments.forEach((arg, idx) => {
      if (arg.isRequired && '' === input.getArgument(idx, '')) {
        throw new Error(`Argument ${arg.name} is required`);
      }
    });
  };
}
