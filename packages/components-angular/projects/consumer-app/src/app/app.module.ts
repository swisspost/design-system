import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { PostComponentsModule } from '@swisspost/design-system-components-angular';
import { TableModule } from 'primeng/table';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { CardControlComponent } from './routes/card-control/card-control.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PostComponentsModule,
    CardControlComponent,
    TableModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent, HomeComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
