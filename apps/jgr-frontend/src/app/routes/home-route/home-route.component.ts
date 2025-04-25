import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchComponent } from '../../components/app/search';
import { TitleComponent } from '../../components/app/title';
import { IconComponent } from '../../components/ui/icon';

@Component({
  templateUrl: 'home-route.component.html',
  styleUrl: 'home-route.component.scss',
  imports: [RouterModule, IconComponent, SearchComponent, TitleComponent],
})
export class HomeRouteComponent {
  private readonly router = inject(Router);

  public handleSearchSubmit(search: string): void {
    this.router.navigate(['search'], {
      queryParams: { q: search },
    });
  }
}
