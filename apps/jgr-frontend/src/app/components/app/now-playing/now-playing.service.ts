import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Playlist } from '../../../services/playlist.service';
import { Song } from '../../../services/search.service';

@Injectable({
  providedIn: 'root',
})
export class NowPlayingService {
  public readonly nowPlaying$ = new BehaviorSubject<Song | null>(null);
  public readonly queue$ = new BehaviorSubject<Song[]>([]);

  public next(): void {
    const queue = this.queue$.getValue();
    const nextSong = queue.at(0);
    if (nextSong != null) {
      this.nowPlaying$.next(nextSong);
      this.queue$.next(queue.slice(1));
    }
  }

  public play(song: Song): void {
    this.nowPlaying$.next(song);
    this.queue$.next([]);
  }

  public playNext(song: Song): void {
    if (this.nowPlaying$.getValue() == null) {
      this.nowPlaying$.next(song);
      return;
    }

    this.queue$.next([song].concat(this.queue$.getValue()));
  }

  public playPlaylist(playlist: Playlist): void {
    this.nowPlaying$.next(playlist.songs[0]);
    this.queue$.next(playlist.songs.slice(1));
  }

  public removeFromQueue(index: number): void {
    const queue = this.queue$.getValue();
    if (index < 0 || index >= queue.length) {
      return;
    }

    const newQueue = [...queue];
    newQueue.splice(index, 1);
    this.queue$.next(newQueue);
  }
}
