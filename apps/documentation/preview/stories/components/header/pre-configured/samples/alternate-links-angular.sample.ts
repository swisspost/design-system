import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class AppComponent {
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Always update related <link rel="alternate" hreflang="..." href="..."> elements, after every route change.
        // You can use the header config, to find the language codes applied to the language switch, if needed.
      });
  }
}
