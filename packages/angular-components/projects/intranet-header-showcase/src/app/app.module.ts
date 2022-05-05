import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SwissPostIntranetHeaderModule } from 'swisspost-intranet-header';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    SwissPostIntranetHeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
