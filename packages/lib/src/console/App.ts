import Command from './Command/Command';
import CommandInterface from './Command/CommandInterface';
import InputInterface from './Input/InputInterface';
import OutputInterface from './Output/OutputInterface';

export default class App {
  private _name: string;
  private _description: string;
  private _commands: { [key: string]: CommandInterface } = {};

  constructor(name: string, description: string = '') {
    this._name = name;
    this._description = description;
  }

  public get commands(): CommandInterface[] {
    return Object.values(this._commands);
  }

  public add = (c: CommandInterface): App => {
    if (this._commands[c.name]) {
      throw new Error('Command already exist');
    }

    this._commands[c.name] = c;

    return this;
  };

  public addCommands = (commands: Command[]): App => {
    commands.forEach(cmd => this.add(cmd));
    return this;
  };

  public help = (output: OutputInterface) => {
    output.writeLn(`<notice>${this._name}</notice> - ${this._description}\n`);

    this.commands.forEach((cmd: Command) =>
      output.writeLn(`    <info>${cmd.name}</info>\t${cmd.description}`)
    );
  };

  public run = async (
    input: InputInterface,
    output: OutputInterface
  ): Promise<void> => {
    const action = input.getFirstArgument();

    if (!action) {
      return this.help(output);
    }

    let cmdName = action;

    if (action === 'help') {
      if (input.getArguments().length > 1) {
        cmdName = input.getArgument(1);
      } else {
        return this.help(output);
      }
    }

    const cmd = this._commands[cmdName];

    if (!cmd) {
      output.writeLn(`<error>Command ${cmdName} does not exist</error>`);
      return;
    }

    if (
      action === 'help' ||
      input.getOption('help', false) ||
      input.getOption('h', false)
    ) {
      return cmd.getHelp(output);
    }

    input.shiftArgument();

    try {
      cmd.validate(input);
      await cmd.execute(input, output);
    } catch (err) {
      err.message
        .split('\n')
        .forEach(line => output.writeLn(`<error>${line}</error>`));
    }
  };
}
