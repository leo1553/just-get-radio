import { ArtistSongs, PlaylistSongs, Song } from 'src/models/song.models';

export type SearchResponse = {
  artist?: ArtistSongs;
  playlists: PlaylistSongs[];
  songs: Song[];
};
