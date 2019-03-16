import dotenv from 'dotenv';
import find from 'find-file-up';

export default class Config {
  private config = null;
  private configFile: string;

  constructor(configFile = '.env') {
    this.configFile = configFile;
  }

  public get = (key: string, bypassEnvironment = false) => {
    if (!bypassEnvironment && process.env && key in process.env) {
      return process.env[key];
    }

    if (null === this.config) {
      this.loadEnvFile();
    }

    if (key in this.config) {
      return this.config[key];
    }

    return undefined;
  };

  private loadEnvFile = () => {
    const config = dotenv.config({
      path: find.sync(this.configFile, __dirname)
    });
    this.config = config.parsed;
  };
}
