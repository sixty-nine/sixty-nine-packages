import { Artist, Track } from './typings';
import { Logger, NullLogger } from '../../logger';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

class LastFmApi {
  private apiKey: string;
  private logger: Logger;

  constructor(apiKey: string, logger: Logger = null) {
    this.apiKey = apiKey;
    this.logger = null !== logger ? logger : NullLogger;
  }

  public request = async (method: string, params: object = null) => {
    let obj = {
      api_key: this.apiKey,
      format: 'json',
      method
    };

    if (null !== params) {
      obj = { ...obj, ...params };
    }

    const query = new URLSearchParams(obj);
    const url = `http://ws.audioscrobbler.com/2.0/?${query.toString()}`;

    this.logger.debug('QUERY: ' + url);

    const resp = await fetch(url);
    return resp.json();
  };

  public artistFromResponse = (data): Artist => {
    if (!data) {
      return null;
    }

    const artist: Artist = {
      _id: null,
      images: {},
      mbid: data.mbid,
      name: data.name,
      url: data.url
    };

    data.image.forEach(image => {
      artist.images[image.size] = image['#text'];
    });

    return artist as Artist;
  };

  public trackFromResponse = (resp): Track => {
    if (!resp) {
      return null;
    }

    const data = { ...resp };

    if (data.album) {
      if (data.album.image) {
        const images = {};
        data.album.image.forEach(image => {
          images[image.size] = image['#text'];
        });
        data.album.images = images;
      }

      data.album['@attr'] = undefined;
      data.album.image = undefined;
    }

    return data as Track;
  };
}

export default LastFmApi;
