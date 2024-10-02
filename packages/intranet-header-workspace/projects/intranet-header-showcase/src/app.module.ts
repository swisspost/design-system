import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SamplesNavigationComponent } from './samples/navigation/navigation.component';
import { SamplesSidebarComponent } from './samples/sidebar/sidebar.component';
import { SwissPostIntranetHeaderModule } from '@swisspost/design-system-intranet-header';
import { SamplesIndexComponent } from './samples/samples-index.component';
import { SamplesSidebarWithSearchbarComponent } from './samples/sidebar-with-searchbar/sidebar-with-searchbar.component';
import { SamplesNavigationCondensedHeaderComponent } from './samples/samples-navigation-condensed-header/samples-navigation-condensed-header.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: SamplesIndexComponent },

  { path: 'samples-navigation', component: SamplesNavigationComponent },
  {
    path: 'samples-navigation-with-condensed-header',
    component: SamplesNavigationCondensedHeaderComponent,
  },
  { path: 'samples-sidebar', component: SamplesSidebarComponent },
  { path: 'samples-sidebar-with-searchbar', component: SamplesSidebarWithSearchbarComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SamplesNavigationComponent,
    SamplesNavigationCondensedHeaderComponent,
    SamplesSidebarComponent,
    SamplesSidebarWithSearchbarComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), SwissPostIntranetHeaderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
