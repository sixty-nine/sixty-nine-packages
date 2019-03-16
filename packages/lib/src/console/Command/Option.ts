import InputInterface from '../Input/InputInterface';

type OptionType = 'string' | 'boolean' | 'numeric';

export default class Option {
  public static OPTION_OPTIONAL = 0;
  public static OPTION_BOOLEAN = 1;
  public static OPTION_NUMERIC = 2;
  public static OPTION_REQUIRED = 4;

  private _name: string;
  private _description: string;
  private _type: OptionType;
  private _isRequired: boolean;

  constructor(
    name: string,
    description: string = '',
    options: number = Option.OPTION_OPTIONAL
  ) {
    this._name = name;
    this._description = description;
    // tslint:disable:no-bitwise
    this._type =
      (options & Option.OPTION_BOOLEAN) === Option.OPTION_BOOLEAN
        ? 'boolean'
        : (options & Option.OPTION_NUMERIC) === Option.OPTION_NUMERIC
        ? 'numeric'
        : 'string';
    this._isRequired =
      (options & Option.OPTION_REQUIRED) === Option.OPTION_REQUIRED;
    // tslint:enable
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get type(): OptionType {
    return this._type;
  }

  public get isRequired(): boolean {
    return this._isRequired;
  }

  public validateValue(input: InputInterface): void {
    const value = input.getOption(this.name, null);

    // If the option is required, it must be there
    if (this.isRequired && !input.hasOption(this.name)) {
      throw new Error(`Option --${this.name} is required`);
    }

    // If the option is present, it must have a valid value
    if (input.hasOption(this.name)) {
      if (this.type === 'numeric') {
        if ('number' !== typeof value || isNaN(Number(value))) {
          throw new Error(`Option --${this.name} must be numeric`);
        }
      } else if (this.type === 'boolean') {
        if (value !== !!value) {
          throw new Error(`Option --${this.name} cannot have a value`);
        }
      } else if (this.type === 'string') {
        if ('boolean' === typeof value) {
          throw new Error(`Option --${this.name} must have a value`);
        }
      }
    }
  }
}
