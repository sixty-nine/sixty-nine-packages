#!/usr/bin/env node

import { App, CLIInput, DefaultFormatter, StringOutput } from '@sixty-nine-packages/console';
import WeatherCommand from './WeatherCommand';
import HelloCommand from './HelloCommand';
import LyricsSearchCommand from './LyricsSearchCommand';
import LyricsFetchCommand from './LyricsFetchCommand';

(() => {

  const input = new CLIInput();
  const output = new StringOutput();

  const app = new App('My App', 'A demo application');
  app.add(new WeatherCommand());
  app.add(new HelloCommand());
  app.add(new LyricsSearchCommand());
  app.add(new LyricsFetchCommand());

  app.run(input, output).finally(() => {
    const f = new DefaultFormatter();
    console.log(f.format(output.content));
    process.exit(0);
  });

})();
