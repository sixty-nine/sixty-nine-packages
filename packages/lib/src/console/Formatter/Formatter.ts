import OutputStyle from './OutputStyle';
interface StylesDict {
  [key: string]: OutputStyle;
}

export default class Formatter {
  private styles: StylesDict = {};

  public hasStyle = (name: string): boolean => !!this.styles[name];

  public addStyle = (name: string, style: OutputStyle): Formatter => {
    if (this.hasStyle(name)) {
      throw new Error(`The style ${name} already exists`);
    }

    this.styles[name] = style;
    return this;
  };

  public getStyle = (name: string): OutputStyle => {
    if (!this.hasStyle(name)) {
      throw new Error(`The style ${name} does not exist`);
    }

    return this.styles[name];
  };

  public format = (text: string): string => {
    let out = '';
    const re = /([^<]*)(<([^>]*)>)([^<]*)(<\/[^>]*>)/g;
    let m = null;
    let lastMatch;
    do {
      lastMatch = m;
      m = re.exec(text);
      if (m) {
        // console.log('MATCH', m);
        const before = m[1];
        const style = m[3];
        const inside = m[4];
        if (this.hasStyle(style)) {
          out += before + this.getStyle(style).apply(inside);
        } else {
          out += before + inside;
        }
      }
    } while (m);

    if (lastMatch) {
      out += text.substr(lastMatch.index + lastMatch[0].length);
    } else {
      out += text;
    }

    return out;
  };
}
