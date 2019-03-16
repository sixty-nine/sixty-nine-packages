export default class Argument {
  public static ARGUMENT_OPTIONAL = 0;
  public static ARGUMENT_REQUIRED = 1;

  private _name: string;
  private _description: string;
  private _isRequired: boolean;

  constructor(
    name: string,
    description: string = '',
    options: number = Argument.ARGUMENT_OPTIONAL
  ) {
    this._name = name;
    this._description = description;
    // tslint:disable:no-bitwise
    this._isRequired =
      (options & Argument.ARGUMENT_REQUIRED) === Argument.ARGUMENT_REQUIRED;
    // tslint:enable
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get isRequired(): boolean {
    return this._isRequired;
  }
}
