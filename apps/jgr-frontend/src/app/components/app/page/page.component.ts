import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SearchComponent } from '../search';
import { TitleComponent } from '../title';
import { PageService } from './page.service';

@Component({
  selector: 'app-page',
  templateUrl: 'page.component.html',
  styleUrl: 'page.component.scss',
  imports: [CommonModule, RouterModule, RouterOutlet, SearchComponent, TitleComponent],
})
export class PageComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly pageService = inject(PageService);
  private readonly router = inject(Router);

  public searchValue = this.pageService.searchValue$.value;

  public ngOnInit(): void {
    this.pageService.searchValue$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(value => this.handleSearchValueObserverChange(value));
  }

  public handleSearchValueChange(value: string): void {
    this.searchValue = value;
    this.pageService.searchValue$.next(value);
  }

  public handleSearchSubmit(value: string): void {
    this.pageService.searchSubmit$.next(value);

    if (!this.router.url.startsWith('/search')) {
      this.router.navigate(['search'], { queryParams: { q: value } });
    }
  }

  private handleSearchValueObserverChange(value: string): void {
    this.searchValue = value;
    this.changeDetectorRef.detectChanges();
  }
}
