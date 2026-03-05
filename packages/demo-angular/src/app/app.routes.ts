import { Routes } from '@angular/router';
import { Index } from './intranet-header';
import { DefaultNavigation } from './intranet-header/default-navigation/default-navigation';
import { CondensedNavigation } from './intranet-header/condensed-navigation/condensed-navigation';
import { Sidebar } from './intranet-header/sidebar/sidebar';
import { SearchAndSidebar } from './intranet-header/search-and-sidebar/search-and-sidebar';

export const routes: Routes = [
  { path: '', redirectTo: 'intranet-header', pathMatch: 'full' },
  { path: 'intranet-header', component: Index },
  { path: 'intranet-header/default-navigation', component: DefaultNavigation },
  { path: 'intranet-header/condensed-navigation', component: CondensedNavigation },
  { path: 'intranet-header/sidebar', component: Sidebar },
  { path: 'intranet-header/search-and-sidebar', component: SearchAndSidebar },
];
