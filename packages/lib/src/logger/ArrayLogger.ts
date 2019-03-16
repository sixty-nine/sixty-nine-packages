import Logger, { LogFunction } from './Logger';

export interface LogEntry {
  level: string;
  message: string;
}

export default class ArrayLogger implements Logger {
  private log: LogEntry[] = [];

  public getLog = (): LogEntry[] => this.log.slice();

  public trace: LogFunction = (message: string) =>
    this.log.push({ level: 'trace', message });

  public verbose: LogFunction = (message: string) =>
    this.log.push({ level: 'verbose', message });

  public debug: LogFunction = (message: string) =>
    this.log.push({ level: 'debug', message });

  public warn: LogFunction = (message: string) =>
    this.log.push({ level: 'warn', message });

  public info: LogFunction = (message: string) =>
    this.log.push({ level: 'info', message });

  public error: LogFunction = (message: string) =>
    this.log.push({ level: 'error', message });

  public critical: LogFunction = (message: string) =>
    this.log.push({ level: 'critical', message });
}
