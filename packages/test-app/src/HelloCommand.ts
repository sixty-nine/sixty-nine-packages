import Lib from '@sixty-nine-packages/lib/src';

export default class HelloCommand extends Lib.console.Command {

  constructor() {
    super('hello', 'Say hello');
    this.addArgument(new Lib.console.Argument('name', 'Who to say hello'));
  }

  public execute = async (input: Lib.console.InputInterface, output: Lib.console.OutputInterface): Promise<void> => {
    const name = input.getFirstArgument() || 'world';
    output.writeLn(`Hello ${name}`);
  };
}
