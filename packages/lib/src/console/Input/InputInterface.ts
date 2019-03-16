export default interface InputInterface {
  shiftArgument: () => void;
  getFirstArgument: () => string;
  getArgument: (pos: number, defaultValue?: string) => string;
  getArguments: () => string[];
  hasArgument: (pos: number) => boolean;
  getOption: (name: string, defaultValue?: any) => any;
  getOptions: () => any[];
  hasOption: (name: string) => boolean;
}
