export default class OutputStyle {
  protected _foreColor: string;
  protected _backColor: string;
  protected _bold: boolean;
  protected _underlined: boolean;

  constructor(
    foreColor = 'white',
    backColor = 'black',
    bold = false,
    underline = false
  ) {
    this._foreColor = foreColor;
    this._backColor = backColor;
    this._bold = bold;
    this._underlined = underline;
  }

  public apply = (text: string): string => text;
}
