#!/usr/bin/env node
import Lib from '@sixty-nine-packages/lib/src';
import WeatherCommand from './WeatherCommand';
import HelloCommand from './HelloCommand';
import LyricsSearchCommand from './LyricsSearchCommand';
import LyricsFetchCommand from './LyricsFetchCommand';

(() => {

  const input = new Lib.console.CLIInput();
  const output = new Lib.console.StringOutput();

  const app = new App('My App', 'A demo application');
  app.add(new WeatherCommand());
  app.add(new HelloCommand());
  app.add(new LyricsSearchCommand());
  app.add(new LyricsFetchCommand());

  app.run(input, output).finally(() => {
    const f = new Lib.console.DefaultFormatter();
    console.log(f.format(output.content));
    process.exit(0);
  });

})();
