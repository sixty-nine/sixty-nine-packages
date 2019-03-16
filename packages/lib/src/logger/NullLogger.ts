import Logger from './Logger';

const NullLogger: Logger = {
  critical: (_msg: string) => null,
  debug: (_msg: string) => null,
  error: (_msg: string) => null,
  info: (_msg: string) => null,
  trace: (_msg: string) => null,
  verbose: (_msg: string) => null,
  warn: (_msg: string) => null
};

export default NullLogger;
