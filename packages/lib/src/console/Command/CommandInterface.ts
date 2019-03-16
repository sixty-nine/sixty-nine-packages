import OutputInterface from '../Output/OutputInterface';
import InputInterface from '../Input/InputInterface';
import Argument from './Argument';
import Option from './Option';

export default interface CommandInterface {
  name: string;
  description: string;
  addOption: (option: Option) => CommandInterface;
  addArgument: (argument: Argument) => CommandInterface;
  validate: (input: InputInterface) => boolean;
  execute: (input: InputInterface, output: OutputInterface) => Promise<void>;
  getHelp: (output: OutputInterface) => void;
}
