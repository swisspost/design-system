import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { providePostComponents } from '@swisspost/design-system-components-angular';
import { providePrimeNG } from 'primeng/config';
import { swissPostPreset } from '@swisspost/design-system-styles-primeng';
import { App } from './app';

const routes: Routes = [
  {
    path: '',
    component: App,
    children: [
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
    ],
  },
  // Outside of `App`, as the pre-configured header replaces the self-managed one.
  {
    title: 'Pre-configured header (script config)',
    path: 'pre-configured-header/script-config',
    data: { configSource: 'script' },
    loadComponent: () =>
      import('./routes/pre-configured-header/pre-configured-header').then(
        m => m.PreConfiguredHeader,
      ),
  },
  {
    title: 'Pre-configured header (API config)',
    path: 'pre-configured-header/api-config',
    data: { configSource: 'api' },
    loadComponent: () =>
      import('./routes/pre-configured-header/pre-configured-header').then(
        m => m.PreConfiguredHeader,
      ),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    providePostComponents(),
    providePrimeNG({ theme: { preset: swissPostPreset } }),
  ],
};
