import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Playlist, PlaylistService, PostPlaylistRequest } from '../../../services/playlist.service';
import { Song } from '../../../services/search.service';
import { IconComponent } from '../../ui/icon';
import { InputComponent } from "../../ui/input/input.component";
import { NowPlayingService } from '../now-playing/now-playing.service';

@Component({
  selector: 'app-playlist-button, [app-playlist-button]',
  templateUrl: 'playlist-button.component.html',
  styleUrl: 'playlist-button.component.scss',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconComponent, InputComponent],
})
export class PlaylistButtonComponent {
  private readonly nowPlayingService = inject(NowPlayingService);
  private readonly playlistService = inject(PlaylistService);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  public readonly formGroup = this.formBuilder.group({
    name: this.formBuilder.control<string>('', Validators.required),
  });

  @Input()
  public type: 'none' | 'create' | 'edit' = 'create';

  @Input()
  public id?: number;

  @Input()
  public name!: string;

  @Input()
  public songs?: Song[];

  @Output()
  public readonly create = new EventEmitter<Playlist>();

  @Output()
  public readonly edit = new EventEmitter<Playlist>();

  @ViewChild('playlistDialog', { static: true })
  public readonly playlistDialog!: ElementRef<HTMLDialogElement>;

  public handleCreatePlaylistClick(): void {
    this.formGroup.setValue({
      name: this.name,
    });
    this.playlistDialog.nativeElement.showModal();
  }

  public handleEditPlaylistClick(): void {
    this.formGroup.setValue({
      name: this.name,
    });
    this.playlistDialog.nativeElement.showModal();
  }

  public handlePlayAllClick(): void {
    this.nowPlayingService.playPlaylist({
      name: this.name,
      songs: this.songs!,
    });
  }

  public async handlePlaylistSubmit(): Promise<void> {
    const playlist: PostPlaylistRequest = {
      name: this.formGroup.value.name!,
      songs: this.songs?.map(s => s.id) ?? [],
    };

    if (this.type === 'create') {
      const response = await lastValueFrom(this.playlistService.post(playlist));
      this.create.emit(response);
    } else {
      const response = await lastValueFrom(this.playlistService.put(this.id!, playlist));
      this.edit.emit(response);
    }

    this.playlistDialog.nativeElement.close();
  }

  public handleDialogClose(): void {
    this.formGroup.setValue({
      name: '',
    });
  }
}
