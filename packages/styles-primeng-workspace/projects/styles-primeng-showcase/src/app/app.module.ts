import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { TableModule } from 'primeng/table';
import { providePrimeNG } from 'primeng/config';

import { AppComponent } from './app.component';
import { Post } from '../../../../dist/styles-primeng';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, TableModule, FormsModule],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Post,
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
