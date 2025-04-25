export type Song = {
  id: string;
  title: string;
  artist: string;
  duration: number;
  cover?: string;
  url: string;
};

export type ArtistSongs = {
  id: string;
  name: string;
  songs: Song[];
};

export type PlaylistSongs = {
  id: number;
  name: string;
  songs: Song[];
};
