// This file is auto-generated. Do not edit manually.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { HeaderActiveNavigationItemComponent } from './routes/header-active-navigation-item/header-active-navigation-item.component';
import { HeaderPortalComponent } from './routes/header-portal/header-portal.component';
import { HeaderJobsComponent } from './routes/header-jobs/header-jobs.component';
import { HeaderMicrositeComponent } from './routes/header-microsite/header-microsite.component';
import { HeaderOnePagerComponent } from './routes/header-one-pager/header-one-pager.component';
import { HeaderOnePagerH1Component } from './routes/header-one-pager-h-1/header-one-pager-h-1.component';
import { HeaderLoggedInComponent } from './routes/header-logged-in/header-logged-in.component';
import { HeaderLoggedOutComponent } from './routes/header-logged-out/header-logged-out.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { title: 'Home', path: 'home', component: HomeComponent },
  { title: 'Header: active-navigation-item', path: 'header-active-navigation-item', component: HeaderActiveNavigationItemComponent },
  { title: 'Header: portal', path: 'header-portal', component: HeaderPortalComponent },
  { title: 'Header: jobs', path: 'header-jobs', component: HeaderJobsComponent },
  { title: 'Header: microsite', path: 'header-microsite', component: HeaderMicrositeComponent },
  { title: 'Header: one-pager', path: 'header-one-pager', component: HeaderOnePagerComponent },
  { title: 'Header: one-pager-h-1', path: 'header-one-pager-h-1', component: HeaderOnePagerH1Component },
  { title: 'Header: logged-in', path: 'header-logged-in', component: HeaderLoggedInComponent },
  { title: 'Header: logged-out', path: 'header-logged-out', component: HeaderLoggedOutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
