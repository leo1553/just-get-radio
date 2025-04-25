import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
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

  @Input({ required: true })
  public id!: string;

  @Input({ required: true })
  public title!: string;

  @Input({ required: true })
  public artist!: string;

  @Input({ required: true })
  public album!: string;

  @Input({ required: true })
  public duration!: number;

  @Input()
  public cover?: string;

  @Input({ required: true })
  public url!: string;

  public get coverUrl(): string {
    return this.cover ?? 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
  }

  public handlePlayClick(): void {
    this.nowPlayingService.nowPlaying$.next(this);
  }

  public handleAddToPlaylistClick(): void {
    this.nowPlayingService.queue$.next(
      this.nowPlayingService.queue$
        .getValue().concat(this),
    );
  }
}
