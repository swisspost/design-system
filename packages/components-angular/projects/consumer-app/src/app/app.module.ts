import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { PostComponentsModule } from '@swisspost/design-system-components-angular';

import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { CardControlComponent } from './routes/card-control/card-control.component';
import { TabsComponent } from './routes/tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PostComponentsModule,
    CardControlComponent,
    TabsComponent,
  ],
  declarations: [AppComponent, HomeComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
