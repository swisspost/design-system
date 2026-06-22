import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { providePostComponents } from '@swisspost/design-system-components-angular';
import { providePrimeNG } from 'primeng/config';
import { swissPostPreset } from '../../../../packages/styles-primeng/dist';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    title: 'Home',
    path: 'home',
    loadComponent: () => import('./routes/home/home').then(m => m.Home),
  },
  {
    title: 'PrimeNg',
    path: 'primeng',
    loadComponent: () => import('./routes/primeng/primeng').then(m => m.PrimeNg),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    providePostComponents(),
    providePrimeNG({ theme: { preset: swissPostPreset } }),
  ],
};
