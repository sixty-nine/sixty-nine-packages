export interface Artist {
  _id: string;
  mbid: string;
  name: string;
  url?: string;
  images?: Images;
}

export interface Track {
  _id: string;
  mbid: string;
  name: string;
  url: string;
  artist: Artist;
  album: Album;
}

export interface Album {
  _id: string;
  artist: string;
  title: string;
  mbid: string;
  url: string;
  images: Images;
}

export interface TrackSearchResult {
  name: string;
  artist: string;
  url: string;
  streamable: string;
  listeners: string;
  image: Images;
  mbid: string;
}

export interface TrackInfo {
  mbid: string;
  name: string;
  url: string;
  duration: string;
  streamable: {
    '#text': string;
    fulltrack: string;
  };
  listeners: string;
  playcount: string;
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  album: {
    artist: string;
    title: string;
    mbid: string;
    url: string;
    image: Images;
    '@attr': {
      position: string;
    };
  };
  toptags: {
    tag: Tag[];
  };
}

export interface Images {
  small?: string;
  medium?: string;
  large?: string;
  extralarge?: string;
  mega?: string;
}

export interface Tag {
  name: string;
  url: string;
}
