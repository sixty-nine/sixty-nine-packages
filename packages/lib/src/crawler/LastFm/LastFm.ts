import { Artist, Track, TrackSearchResult } from './typings';
import LastFmApi from './LastFmApi';

export default class LastFm {
  private api: LastFmApi;

  constructor(apiKey: string) {
    this.api = new LastFmApi(apiKey);
  }

  public artistSearch = async (artist: string): Promise<Artist[]> => {
    const data = await this.api.request('artist.search', { artist });
    return data.results.artistmatches.artist.map(resp =>
      this.api.artistFromResponse(resp)
    );
  };

  public trackSearch = async (
    track: string,
    artist: string = null
  ): Promise<TrackSearchResult[]> => {
    const params: any = { track };
    if (null !== artist) {
      params.artist = artist;
    }
    const data = await this.api.request('track.search', params);
    return data.results.trackmatches.track.map(resp =>
      this.api.trackFromResponse(resp)
    );
  };

  public artistInfo = async (mbid: string): Promise<Artist> => {
    const data = await this.api.request('artist.getInfo', { mbid });
    return this.api.artistFromResponse(data.artist);
  };

  public artistInfoByName = async (artist: string): Promise<Artist> => {
    const data = await this.api.request('artist.getInfo', { artist });
    return this.api.artistFromResponse(data.artist);
  };

  public trackInfo = async (mbid: string): Promise<Track> => {
    const data = await this.api.request('track.getInfo', { mbid });
    return this.api.trackFromResponse(data.track);
  };

  public trackInfoByTitle = async (
    track: string,
    artist: string = null
  ): Promise<Track> => {
    const params: any = { track };
    if (null !== artist) {
      params.artist = artist;
    }

    const data = await this.api.request('track.getInfo', params);
    return this.api.trackFromResponse(data.track);
  };
}
