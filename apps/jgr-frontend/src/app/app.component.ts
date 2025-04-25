import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NowPlayingComponent } from './components/app/now-playing';

@Component({
  selector: '[app-root]',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, NowPlayingComponent],
})
export class AppComponent { }
