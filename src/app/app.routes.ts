import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth-guard-guard';

export const pathRoute = {
  home: 'home',
  testPage: 'test-page',
  login: 'login',
  register: 'register',
  notAuthenticated: 'not-authenticated',
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: pathRoute.home,
    pathMatch: 'full',
  },
  {
    path: pathRoute.home,
    loadComponent: () =>
      import('./pages/homepage/homepage').then((m) => m.Homepage),
    canActivate: [authGuard],
  },
  {
    path: pathRoute.testPage,
    loadComponent: () =>
      import('./components/test-component/test-component').then(
        (m) => m.TestComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: pathRoute.login,
    loadComponent: () =>
      import('./core/pages/login/login').then((m) => m.Login),
  },
  {
    path: pathRoute.register,
    loadComponent: () =>
      import('./core/pages/register/register').then((m) => m.Register),
  },
  {
    path: pathRoute.notAuthenticated,
    loadComponent: () =>
      import('./core/pages/not-authenticated/not-authenticated').then(
        (m) => m.NotAuthenticated
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/pages/error-page/error-page').then((m) => m.ErrorPage),
  },
];
