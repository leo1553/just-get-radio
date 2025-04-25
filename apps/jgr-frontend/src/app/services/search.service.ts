import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly httpClient = inject(HttpClient);

  public search(query: string): Observable<SearchResponse> {
    const params = new URLSearchParams();
    params.set('q', query);

    return this.httpClient.get<SearchResponse>(`/api/search?${params.toString()}`);
  }
}
