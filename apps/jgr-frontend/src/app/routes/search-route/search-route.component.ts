import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, merge, share, shareReplay, switchMap } from 'rxjs';
import { PageService } from '../../components/app/page';
import { PlaylistComponent } from '../../components/app/playlist';
import { PlaylistButtonComponent } from '../../components/app/playlist-button';
import { SongComponent } from '../../components/app/song';
import { Playlist } from '../../services/playlist.service';
import { SearchService } from '../../services/search.service';

@Component({
  templateUrl: 'search-route.component.html',
  styleUrl: 'search-route.component.scss',
  imports: [CommonModule, PlaylistButtonComponent, SongComponent, PlaylistComponent],
})
export class SearchRouteComponent implements OnInit {
  public readonly pageService = inject(PageService);
  private readonly searchService = inject(SearchService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  public readonly query$ = this.pageService.searchValue$.pipe(
    takeUntilDestroyed(),
    share(),
  );

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

  public handlePlaylistCreate(playlist: Playlist): void {
    this.router.navigate(['playlist', playlist.id]);
  }

  private handleSearchSubmit(query: string): void {
    const url = new URL(window.location.href);
    url.searchParams.set('q', query);
    window.history.pushState({}, '', url.toString());
  }
}
