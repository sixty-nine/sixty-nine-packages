import OutputInterface from './OutputInterface';

export default class StringOutput implements OutputInterface {
  private _buffer: string = '';

  public get content(): string {
    return this._buffer;
  }

  public write = (msg: string | string[] = ''): OutputInterface => {
    const msgArr = Array.isArray(msg) ? msg : [msg];
    msgArr.forEach(m => (this._buffer += m));
    return this;
  };

  public writeLn = (msg: string | string[] = ''): OutputInterface => {
    const msgArr = Array.isArray(msg) ? msg : [msg];
    msgArr.forEach(m => (this._buffer += m + '\n'));
    return this;
  };
}
