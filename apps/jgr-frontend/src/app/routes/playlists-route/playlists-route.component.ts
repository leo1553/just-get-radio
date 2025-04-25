import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { lastValueFrom, merge, share, Subject } from 'rxjs';
import { PlaylistComponent } from '../../components/app/playlist';
import { PlaylistButtonComponent } from "../../components/app/playlist-button/playlist-button.component";
import { Playlist, PlaylistService } from '../../services/playlist.service';

@Component({
  templateUrl: 'playlists-route.component.html',
  styleUrl: 'playlists-route.component.scss',
  imports: [CommonModule, PlaylistComponent, PlaylistButtonComponent],
})
export class PlaylistsRouteComponent {
  private readonly playlistService = inject(PlaylistService);

  private readonly playlistsUpdate$ = new Subject<Playlist[]>();

  public readonly playlists$ = merge(
    this.playlistService.all(),
    this.playlistsUpdate$,
  )
    .pipe(takeUntilDestroyed(), share());

  public async handlePlaylistDelete(playlists: Playlist[], index: number): Promise<void> {
    const playlist = playlists[index];

    await lastValueFrom(this.playlistService.delete(playlist.id!));

    playlists.splice(index, 1);
    this.playlistsUpdate$.next(playlists);
  }

  public async handlePlaylistCreate(playlists: Playlist[], playlist: Playlist): Promise<void> {
    this.playlistsUpdate$.next(playlists.concat(playlist));
  }
}
