export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover?: string;
  url: string;
};

export type ArtistSongs = {
  id: string;
  name: string;
  songs: Song[];
};

export type SearchResponse = {
  artist?: ArtistSongs;
  songs: Song[];
};
