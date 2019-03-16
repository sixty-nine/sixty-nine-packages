import { Command, InputInterface, OutputInterface, Argument } from '@sixty-nine-packages/console';
import { ArrayLogger } from '@sixty-nine-packages/logger';
import { CachedWikiLyrics } from '@sixty-nine-packages/crawler';
import { RedisCacheStorage } from '@sixty-nine-packages/cache';

export default class LyricsFetchCommand extends Command {

  constructor() {
    super('lyrics:fetch', 'Fetch song lyrics');
    this.addArgument(new Argument('url', 'The lyrics URL', Argument.ARGUMENT_REQUIRED));
  }

  public execute = async (input: InputInterface, output: OutputInterface): Promise<void> => {
    const url = input.getFirstArgument();
    const storage = new RedisCacheStorage();
    const logger= new ArrayLogger();
    const service = new CachedWikiLyrics(storage, logger);
    const res = await service.fetchLyrics(url);

    output.writeLn(res);
    output.writeLn();
  };
}
