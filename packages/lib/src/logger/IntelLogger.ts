import intel from 'intel';
import Logger, { LogFunction } from './Logger';

export default class IntelLogger implements Logger {
  public constructor(level: string = intel.DEBUG) {
    intel.basicConfig({
      format: '[%(date)s] %(name)s.%(levelname)s: %(message)s',
      level
    });
  }

  public trace: LogFunction = (msg: string) => intel.trace(msg);
  public verbose: LogFunction = (msg: string) => intel.verbose(msg);
  public debug: LogFunction = (msg: string) => intel.debug(msg);
  public warn: LogFunction = (msg: string) => intel.warn(msg);
  public info: LogFunction = (msg: string) => intel.info(msg);
  public error: LogFunction = (msg: string) => intel.error(msg);
  public critical: LogFunction = (msg: string) => intel.critical(msg);
}
