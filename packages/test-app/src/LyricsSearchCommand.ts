import { Command, InputInterface, OutputInterface, Argument } from '@sixty-nine-packages/console';
import { ArrayLogger } from '@sixty-nine-packages/logger';
import { CachedWikiLyrics } from '@sixty-nine-packages/crawler';
import { RedisCacheStorage } from '@sixty-nine-packages/cache';

export default class LyricsSearchCommand extends Command {

  constructor() {
    super('lyrics:search', 'Search song lyrics');
    this.addArgument(new Argument('title', 'The song title', Argument.ARGUMENT_REQUIRED));
  }

  public execute = async (input: InputInterface, output: OutputInterface): Promise<void> => {
    const title = input.getFirstArgument();
    const storage = new RedisCacheStorage();
    const logger= new ArrayLogger();
    const service = new CachedWikiLyrics(storage, logger);
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
