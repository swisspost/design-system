import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { CardControlComponent } from './routes/card-control/card-control.component';
import { TabsComponent } from './routes/tabs/tabs.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { title: 'Home', path: 'home', component: HomeComponent },
  { title: 'Card-Control', path: 'card-control', component: CardControlComponent },
  { title: 'Tabs', path: 'tabs', component: TabsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
