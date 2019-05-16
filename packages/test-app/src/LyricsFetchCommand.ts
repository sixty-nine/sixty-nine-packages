import Lib from '@sixty-nine-packages/lib/src';

export default class LyricsFetchCommand extends Lib.console.Command {

  constructor() {
    super('lyrics:fetch', 'Fetch song lyrics');
    this.addArgument(new Lib.console.Argument('url', 'The lyrics URL', Lib.console.Argument.ARGUMENT_REQUIRED));
  }

  public execute = async (input: Lib.console.InputInterface, output: Lib.console.OutputInterface): Promise<void> => {
    const url = input.getFirstArgument();
    const storage = new Lib.cache.storage.RedisCacheStorage();
    const logger= new Lib.logger.ArrayLogger();
    const service = new Lib.crawler.CachedWikiLyrics(storage, logger);
    const res = await service.fetchLyrics(url);

    output.writeLn(res);
    output.writeLn();
  };
}
