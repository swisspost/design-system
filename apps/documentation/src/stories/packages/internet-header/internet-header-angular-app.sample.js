import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AppHeader, AppFooter } from './navigation';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [
    AppHeader,
    AppFooter,
  ],
})
export class App implements OnInit {
  /* ... */
}
