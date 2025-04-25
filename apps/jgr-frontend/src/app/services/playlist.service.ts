import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from './search.service';

export type Playlist = {
  id?: number;
  name: string;
  songs: Song[];
};

export type GetPlaylistResponse = Playlist;

export type PostPlaylistRequest = {
  name: string;
  songs: string[];
};
export type PostPlaylistResponse = Playlist;

export type PutPlaylistRequest = PostPlaylistRequest;
export type PutPlaylistResponse = Playlist;

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private readonly httpClient = inject(HttpClient);

  public all(): Observable<GetPlaylistResponse[]> {
    return this.httpClient.get<GetPlaylistResponse[]>(`/api/playlist`);
  }

  public get(id: number): Observable<GetPlaylistResponse> {
    return this.httpClient.get<GetPlaylistResponse>(`/api/playlist/${id}`);
  }

  public post(playlist: PostPlaylistRequest): Observable<PostPlaylistResponse> {
    return this.httpClient.post<PostPlaylistResponse>(`/api/playlist`, playlist);
  }

  public put(id: number, playlist: PutPlaylistRequest): Observable<PutPlaylistResponse> {
    return this.httpClient.put<PutPlaylistResponse>(`/api/playlist/${id}`, playlist);
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`/api/playlist/${id}`);
  }
}
