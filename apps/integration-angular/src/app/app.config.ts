import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { providePostComponents } from '@swisspost/design-system-components-angular';
import { Home } from './routes/home/home';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { title: 'Home', path: 'home', component: Home },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), providePostComponents()],
};
