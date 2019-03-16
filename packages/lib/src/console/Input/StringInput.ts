import minimist from 'minimist';
import InputInterface from './InputInterface';

export default class StringInput implements InputInterface {
  private _arguments: string[];
  private _options: any[];

  constructor(input: string) {
    const { _: cmd, ...args } = minimist(input.split(/\s+/));
    this._arguments = cmd.filter(i => i);
    this._options = args;
  }

  public shiftArgument = () => {
    const [...rest] = this._arguments;
    rest.shift();
    this._arguments = rest;
  };

  public getFirstArgument = (): string =>
    this._arguments.length > 0 ? this._arguments[0] : null;

  public getArgument = (pos: number, defaultValue?: string): string => {
    if (this.hasArgument(pos)) {
      return this._arguments[pos];
    }

    if ('undefined' !== typeof defaultValue) {
      return defaultValue;
    }

    throw new Error(`Unknown argument #${pos.toString()}`);
  };

  public getArguments = (): string[] => {
    return this._arguments.slice();
  };

  public hasArgument = (pos: number): boolean => pos < this._arguments.length;

  public getOption = (name: string, defaultValue?: any): any => {
    if (this.hasOption(name)) {
      return this._options[name];
    }

    if ('undefined' !== typeof defaultValue) {
      return defaultValue;
    }

    throw new Error(`Unknown option "${name}"`);
  };

  public getOptions = (): any[] => Object.keys(this._options);

  public hasOption = (name: string): boolean => !!this._options[name];
}
