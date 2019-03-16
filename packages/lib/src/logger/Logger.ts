export type LogFunction = (msg: string) => void;

interface Logger {
  trace: LogFunction;
  verbose: LogFunction;
  debug: LogFunction;
  info: LogFunction;
  warn: LogFunction;
  error: LogFunction;
  critical: LogFunction;
}

export default Logger;
