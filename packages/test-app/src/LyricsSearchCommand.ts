import Lib from '@sixty-nine-packages/lib/src';

export default class LyricsSearchCommand extends Lib.console.Command {

  constructor() {
    super('lyrics:search', 'Search song lyrics');
    this.addArgument(new Lib.console.Argument('title', 'The song title', Lib.console.Argument.ARGUMENT_REQUIRED));
  }

  public execute = async (input: Lib.console.InputInterface, output: Lib.console.OutputInterface): Promise<void> => {
    const title = input.getFirstArgument();
    const storage = new Lib.cache.storage.RedisCacheStorage();
    const logger= new Lib.logger.ArrayLogger();
    const service = new Lib.crawler.CachedWikiLyrics(storage, logger);
    const res = await service.searchLyrics(title);

    res.forEach(item => {
      if (item.title) {
        output.writeLn(`> SONG ${item.artist} - ${item.title}`);
      } else {
        output.writeLn(`> ARTIST ${item.artist}`);
      }
      output.writeLn(`${item.link}`);
      output.writeLn();
    });
  };
}
