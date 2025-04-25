import { Song } from 'src/models/song.models';

export type Playlist = {
  id?: number;
  name: string;
  songs: Song[];
};

export type GetPlaylistResponse = Playlist;

export class PostPlaylistRequest {
  public name!: string;
  public songs!: string[];
};
export type PostPlaylistResponse = Playlist;

export type PutPlaylistRequest = PostPlaylistRequest;
export type PutPlaylistResponse = Playlist;
