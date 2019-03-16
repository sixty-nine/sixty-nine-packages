import StringInput from './StringInput';

export default class CLIInput extends StringInput {
  constructor() {
    super(process.argv.slice(2).join(' '));
  }
}
