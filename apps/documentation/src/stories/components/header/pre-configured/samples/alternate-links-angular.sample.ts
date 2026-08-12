import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

const LANGUAGES = ['de', 'fr', 'it', 'en'];

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class AppComponent {
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const pathWithoutLang = event.urlAfterRedirects.replace(/^\/(de|fr|it|en)/, '');

        for (const lang of LANGUAGES) {
          const link = document.querySelector<HTMLLinkElement>(`link[hreflang="${lang}"]`);
          if (link) link.href = `/${lang}${pathWithoutLang}`;
        }
      });
  }
}