import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'test-page',
    pathMatch: 'full',
  },
  {
    path: 'test-page',
    loadComponent: () =>
      import('./components/test-component/test-component').then(
        (m) => m.TestComponent
      ),
  },
];
