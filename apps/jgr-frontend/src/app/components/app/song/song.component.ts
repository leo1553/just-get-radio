import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { lastValueFrom, share } from 'rxjs';
import { Playlist, PlaylistService } from '../../../services/playlist.service';
import { Song } from '../../../services/search.service';
import { IconComponent } from '../../ui/icon';
import { NowPlayingService } from '../now-playing/now-playing.service';

@Component({
  selector: 'app-song, [app-song]',
  templateUrl: 'song.component.html',
  styleUrl: 'song.component.scss',
  imports: [CommonModule, IconComponent],
})
export class SongComponent implements Song {
  private readonly nowPlayingService = inject(NowPlayingService);
  private readonly playlistService = inject(PlaylistService);

  @Input({ required: true })
  public id!: string;

  @Input({ required: true })
  public title!: string;

  @Input({ required: true })
  public artist!: string;

  @Input({ required: true })
  public duration!: number;

  @Input()
  public cover?: string;

  @Input({ required: true })
  public url!: string;

  @Input()
  public deletable = false;

  @Output()
  public readonly delete = new EventEmitter<void>();

  @ViewChild('addToPlaylistDialog', { static: true })
  public addToPlaylistDialog!: ElementRef<HTMLDialogElement>;

  public readonly playlists$ = this.playlistService.all()
    .pipe(takeUntilDestroyed(), share());

  public get coverUrl(): string {
    return this.cover ?? 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
  }

  public handlePlayClick(): void {
    this.nowPlayingService.play(this);
  }

  public handlePlayNextClick(): void {
    this.nowPlayingService.playNext(this);
  }

  public handleAddToPlaylistClick(): void {
    this.addToPlaylistDialog.nativeElement.showModal();
  }

  public async handleAddToPlaylistModalClick(playlist: Playlist): Promise<void> {
    await lastValueFrom(this.playlistService.put(playlist.id!, {
      name: playlist.name,
      songs: [...playlist.songs.map(s => s.id), this.id],
    }));
  }
}
