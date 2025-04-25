import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SearchComponent } from '../../components/app/search';
import { TitleComponent } from '../../components/app/title';

@Component({
  templateUrl: 'home-route.component.html',
  styleUrl: 'home-route.component.scss',
  imports: [SearchComponent, TitleComponent],
})
export class HomeRouteComponent {
  private readonly router = inject(Router);

  public handleSearchSubmit(search: string): void {
    this.router.navigate(['search'], {
      queryParams: { q: search },
    });
  }
}
