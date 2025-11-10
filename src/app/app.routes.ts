import { Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // root → home
  { path: 'home', component: App }, // route secondaria
  { path: '**', redirectTo: 'home' }, // fallback SPA
];
