export default interface OutputInterface {
  readonly content: any;
  write: (msg?: string | string[]) => OutputInterface;
  writeLn: (msg?: string | string[]) => OutputInterface;
}
