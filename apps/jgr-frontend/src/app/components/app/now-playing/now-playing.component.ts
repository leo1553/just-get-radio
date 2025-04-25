import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { animationFrames, fromEvent, map, share, takeUntil } from 'rxjs';
import { Song } from '../../../services/search.service';
import { IconComponent } from '../../ui/icon';
import { NowPlayingService } from './now-playing.service';

@Component({
  selector: 'app-now-playing, [app-now-playing]',
  templateUrl: 'now-playing.component.html',
  styleUrl: 'now-playing.component.scss',
  imports: [CommonModule, IconComponent],
})
export class NowPlayingComponent implements AfterViewInit {
  private readonly nowPlayingService = inject(NowPlayingService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly animationFrame$ = animationFrames()
    .pipe(share());

  public readonly progress$ = this.animationFrame$
    .pipe(map(() => this.progress));

  public readonly currentTime$ = this.animationFrame$
    .pipe(map(() => this.currentTime));

  public readonly nextSong$ = this.nowPlayingService.queue$
    .pipe(map(queue => queue.at(0)));

  private player?: any;

  public get volume(): number {
    return this.player?.getVolume() ?? 0;
  }

  public set volume(volume: number) {
    if (this.player) {
      this.player.setVolume(volume);
    }
  }

  public get playing(): boolean {
    return this.player?.getPlayerState() === 1;
  }

  public set playing(playing: boolean) {
    if (this.player) {
      if (playing) {
        this.player.playVideo();
      } else {
        this.player.pauseVideo();
      }
    }
  }

  public get currentSong(): Song | null {
    return this.nowPlayingService.nowPlaying$.getValue();
  }

  public get currentTime(): number {
    return this.player
      ? this.player.getCurrentTime() * 1000
      : 0;
  }

  public get duration(): number {
    return this.player
      ? this.player.getDuration() * 1000
      : 0;
  }

  public get progress(): number {
    if (this.player) {
      const duration = this.player.getDuration();
      const currentTime = this.player.getCurrentTime();
      return (currentTime / duration) * 100;
    }

    return 0;
  }

  public ngAfterViewInit(): void {
    const player = new window.YT.Player('now-playing-frame', {
      height: '360',
      width: '640',
      videoId: '',
      events: {
        onReady: () => this.handlePlayerReady(player),
        onStateChange: (event: any) => this.handlePlayerStateChange(event),
      },
    });

    this.nowPlayingService.nowPlaying$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(song => this.handleSongChange(song));
  }

  public handlePlayClick(): void {
    this.playing = true;
  }

  public handlePauseClick(): void {
    this.playing = false;
  }

  public handleNextClick(nextSong: Song): void {
    this.nowPlayingService.nowPlaying$.next(nextSong);
    this.nowPlayingService.queue$.next(
      this.nowPlayingService.queue$
        .getValue().slice(1),
    );
  }

  public handleCurrentTimeBarClick(mouseEvent: MouseEvent): void {
    if (!this.playing || this.currentSong == null)
      return;

    const slider = mouseEvent.currentTarget as HTMLDivElement;
    const sliderWidth = slider.clientWidth;
    const clickX = mouseEvent.clientX - slider.getBoundingClientRect().left;
    const clickPercentage = clickX / sliderWidth;

    const duration = this.player.getDuration();
    const newTime = clickPercentage * duration;

    this.player.seekTo(newTime, true);
  }

  public handleVolumeBarMouseDown(event: Event): void {
    fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        takeUntil(fromEvent(document, 'mouseup')),
      )
      .subscribe(mouseEvent => this.handleVolumeBarClick(mouseEvent, event.target as HTMLDivElement));
  }

  public handleVolumeBarClick(mouseEvent: MouseEvent, slider?: HTMLDivElement): void {
    slider ??= mouseEvent.currentTarget as HTMLDivElement;

    const sliderWidth = slider.clientWidth;
    const clickX = mouseEvent.clientX - slider.getBoundingClientRect().left;
    const clickPercentage = clickX / sliderWidth;

    const newVolume = Math.round(clickPercentage * 100);

    this.volume = Math.min(Math.max(newVolume, 0), 100);
  }

  private handlePlayerReady(player: any): void {
    this.player = player;

    this.volume = 50;
    this.playing = false;
  }

  private handlePlayerStateChange(event: any): void {
    if (event.state === -1) {
      this.player.playVideo();
    }
  }

  private handleSongChange(song: Song | null): void {
    if (song != null) {
      const url = new URL(song.url);
      const videoId = url.searchParams.get('v') ?? url.pathname.substring(1);

      this.player.loadVideoById(videoId);
      this.playing = true;
    }
  }
}
