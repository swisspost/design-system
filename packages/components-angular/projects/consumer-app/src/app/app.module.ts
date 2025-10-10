import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { providePostComponents } from '@swisspost/design-system-components-angular';

import { AppComponent } from './app.component';
import { CardControlComponent } from './routes/card-control/card-control.component';
import { PopoverComponent } from './routes/popover/popover.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CardControlComponent,
    PopoverComponent,
  ],
  declarations: [AppComponent],
  providers: [providePostComponents()],
  bootstrap: [AppComponent],
})
export class AppModule {}
