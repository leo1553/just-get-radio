import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../../../services/search.service';

@Injectable({
  providedIn: 'root',
})
export class NowPlayingService {
  public readonly nowPlaying$ = new BehaviorSubject<Song | null>(null);
  public readonly queue$ = new BehaviorSubject<Song[]>([]);
}
