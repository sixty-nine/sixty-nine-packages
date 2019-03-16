import { Command, InputInterface, OutputInterface, Argument } from '@sixty-nine-packages/console';

export default class HelloCommand extends Command {

  constructor() {
    super('hello', 'Say hello');
    this.addArgument(new Argument('name', 'Who to say hello'));
  }

  public execute = async (input: InputInterface, output: OutputInterface): Promise<void> => {
    const name = input.getFirstArgument() || 'world';
    output.writeLn(`Hello ${name}`);
  };
}
