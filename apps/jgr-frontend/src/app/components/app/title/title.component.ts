import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BehaviorSubject, delay, merge, of, switchMap } from 'rxjs';

const DELAY = 1000;

@Component({
  selector: 'app-title, [app-title]',
  templateUrl: 'title.component.html',
  styleUrl: 'title.component.scss',
  imports: [CommonModule],
})
export class TitleComponent {
  private readonly useAnim$ = new BehaviorSubject(false);

  @Input()
  public set useAnim(useAnim: boolean) {
    this.useAnim$.next(useAnim);
  }

  public readonly text$ = this.useAnim$.pipe(
    switchMap(useAnim => useAnim
      ? merge(
        of('Just!'),
        of('Get!').pipe(delay(DELAY)),
        of('Radio!').pipe(delay(2 * DELAY)),
        of('Radioo!').pipe(delay(2.2 * DELAY)),
        of('Radiooo!').pipe(delay(2.4 * DELAY)),
        of('Radioooo!').pipe(delay(2.6 * DELAY)),
        of('Radiooooo!').pipe(delay(2.8 * DELAY)),
        of('Radioooooo!').pipe(delay(3 * DELAY)),
        of('Just Get Radio!').pipe(delay(6 * DELAY)),
      )
      : of('Just Get Radio!'),
    ),
  );

  public readonly startAnimation$ = this.useAnim$.pipe(
    switchMap(useAnim => useAnim
      ? merge(
        of(true),
        of(false).pipe(delay(6 * DELAY)),
      )
      : of(false),
    ),
  );
}
