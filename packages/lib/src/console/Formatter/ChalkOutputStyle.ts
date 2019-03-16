import OutputStyle from './OutputStyle';
import chalk from 'chalk';

export default class ChalkOutputStyle extends OutputStyle {
  public static error: OutputStyle = new ChalkOutputStyle('white', 'red', true);
  public static notice: OutputStyle = new ChalkOutputStyle('yellow', 'black');
  public static info: OutputStyle = new ChalkOutputStyle('green', 'black');

  public apply = (text: string): string => {
    let c = chalk;
    if (this._bold) {
      c = c.bold;
    }
    if (this._underlined) {
      c = c.underline;
    }
    const bg =
      'bg' +
      this._backColor.substr(0, 1).toUpperCase() +
      this._backColor.substr(1);

    // FIXME: some error checking should be done here.
    c = c[bg];
    c = c[this._foreColor];

    return c(text);
  };
}
