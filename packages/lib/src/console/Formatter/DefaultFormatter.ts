import Formatter from './Formatter';
import ChalkOutputStyle from './ChalkOutputStyle';

export default class DefaultFormatter extends Formatter {
  constructor() {
    super();
    this.addStyle('error', ChalkOutputStyle.error);
    this.addStyle('notice', ChalkOutputStyle.notice);
    this.addStyle('info', ChalkOutputStyle.info);
  }
}
