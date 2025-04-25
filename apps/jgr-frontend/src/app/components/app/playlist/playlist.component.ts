import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Playlist } from '../../../services/playlist.service';
import { Song } from '../../../services/search.service';
import { IconComponent } from '../../ui/icon';
import { NowPlayingService } from '../now-playing/now-playing.service';

@Component({
  selector: 'app-playlist, [app-playlist]',
  templateUrl: 'playlist.component.html',
  styleUrl: 'playlist.component.scss',
  imports: [CommonModule, RouterModule, IconComponent],
})
export class PlaylistComponent implements Playlist {
  private readonly nowPlayingService = inject(NowPlayingService);

  @Input({ required: true })
  public id!: number;

  @Input({ required: true })
  public name!: string;

  @Input({ required: true })
  public owner!: string;

  @Input({ required: true })
  public songs!: Song[];

  @Input()
  public editable = false;

  @Input()
  public deletable = false;

  @Output()
  public delete = new EventEmitter<void>();

  public get coverUrl(): string {
    return this.songs[0]?.cover ?? 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';
  }

  public get duration(): number {
    return this.songs.map(s => s.duration).reduce((acc, d) => acc + d, 0);
  }

  public handlePlayClick(): void {
    this.nowPlayingService.playPlaylist(this);
  }
}
