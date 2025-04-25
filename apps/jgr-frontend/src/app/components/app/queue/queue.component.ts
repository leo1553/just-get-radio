import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { IconComponent } from '../../ui/icon';
import { NowPlayingService } from '../now-playing/now-playing.service';

@Component({
  selector: 'app-queue',
  templateUrl: 'queue.component.html',
  styleUrl: 'queue.component.scss',
  imports: [CommonModule, IconComponent],
})
export class QueueComponent {
  private readonly nowPlayingService = inject(NowPlayingService);

  @ViewChild('queueDialog', { static: true })
  public readonly playlistDialog!: ElementRef<HTMLDialogElement>;

  public readonly queue$ = this.nowPlayingService.queue$;

  public handleButtonClick(): void {
    this.playlistDialog.nativeElement.showModal();
  }

  public handleRemoveClick(index: number): void {
    this.nowPlayingService.removeFromQueue(index);
  }
}
