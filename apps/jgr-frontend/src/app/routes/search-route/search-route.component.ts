import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { first, map, merge, shareReplay, switchMap } from 'rxjs';
import { PageService } from '../../components/app/page';
import { SongComponent } from '../../components/app/song';
import { SearchService } from '../../services/search.service';

@Component({
  templateUrl: 'search-route.component.html',
  styleUrl: 'search-route.component.scss',
  imports: [CommonModule, SongComponent],
})
export class SearchRouteComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pageService = inject(PageService);
  private readonly searchService = inject(SearchService);
  private readonly destroyRef = inject(DestroyRef);

  public readonly search$ = merge(
    // Limpa a pesquisa ao submeter um novo valor
    this.pageService.searchSubmit$.pipe(map(() => null)),
    merge(
      // Realiza a busca com o valor inicial
      this.pageService.searchValue$.pipe(first()),
      // Realiza a busca com alteracoes de valor
      this.pageService.searchSubmit$
    ).pipe(switchMap(query => this.searchService.search(query))),
  ).pipe(
    takeUntilDestroyed(),
    shareReplay(),
  );

  public ngOnInit(): void {
    const searchQuery = this.activatedRoute.snapshot.queryParamMap.get('q');

    if (searchQuery)
      this.pageService.searchValue$.next(searchQuery);

    this.pageService.searchSubmit$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(query => this.handleSearchSubmit(query));
  }

  private handleSearchSubmit(query: string): void {
    const url = new URL(window.location.href);
    url.searchParams.set('q', query);
    window.history.pushState({}, '', url.toString());
  }
}
