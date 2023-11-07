import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SwissPostIntranetHeaderModule } from '../../../intranet-header/src/lib/swisspost-intranet-header.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot([]), SwissPostIntranetHeaderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
