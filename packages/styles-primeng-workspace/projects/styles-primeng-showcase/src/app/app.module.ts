import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { TableModule } from 'primeng/table';
import { providePrimeNG } from 'primeng/config';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TableModule, FormsModule],
  providers: [providePrimeNG()],
  bootstrap: [AppComponent],
})
export class AppModule {}
