import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponentsModule } from 'components';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PostComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
