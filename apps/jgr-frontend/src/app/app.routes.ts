import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./routes/home-route').then(m => m.HomeRouteComponent),
  },
  {
    path: '',
    pathMatch: 'prefix',
    loadComponent: () => import('./components/app/page').then(m => m.PageComponent),
    children: [
      {
        path: 'search',
        loadComponent: () => import('./routes/search-route').then(m => m.SearchRouteComponent),
      },
      {
        path: '**',
        loadComponent: () => import('./routes/not-found-route').then(m => m.NotFoundRouteComponent),
      }
    ],
  }
];
