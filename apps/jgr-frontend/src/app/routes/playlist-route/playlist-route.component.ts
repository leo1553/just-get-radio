import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom, map, merge, share, Subject, switchMap } from 'rxjs';
import { PlaylistButtonComponent } from "../../components/app/playlist-button/playlist-button.component";
import { SongComponent } from "../../components/app/song/song.component";
import { Playlist, PlaylistService } from '../../services/playlist.service';

@Component({
  templateUrl: 'playlist-route.component.html',
  styleUrl: 'playlist-route.component.scss',
  imports: [CommonModule, SongComponent, PlaylistButtonComponent],
})
export class PlaylistRouteComponent {
  private readonly playlistService = inject(PlaylistService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly playlistUpdate$ = new Subject<Playlist>();

  public readonly playlistId$ = this.activatedRoute.params
    .pipe(map(params => params['id']));

  public readonly playlist$ = merge(
    this.playlistId$.pipe(switchMap(id => this.playlistService.get(id))),
    this.playlistUpdate$,
  ).pipe(
    takeUntilDestroyed(),
    share(),
  );

  public async handleSongDelete(playlist: Playlist, index: number): Promise<void> {
    playlist.songs.splice(index, 1);

    const response = await lastValueFrom(this.playlistService.put(playlist.id!, {
      name: playlist.name,
      songs: playlist.songs.map(song => song.id!),
    }));

    this.playlistUpdate$.next(response);
  }

  public handlePlaylistEdit(playlist: Playlist): void {
    this.playlistUpdate$.next(playlist);
  }
}
