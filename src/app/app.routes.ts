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
  {
    path: 'login',
    loadComponent: () =>
      import('./core/pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./core/pages/register/register').then((m) => m.Register),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/pages/error-page/error-page').then((m) => m.ErrorPage),
  },
];
