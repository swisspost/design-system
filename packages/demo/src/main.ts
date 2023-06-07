import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@swisspost/design-system-components/loader';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

hljs.registerLanguage('css', css);
hljs.highlightAll();

defineCustomElements();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
