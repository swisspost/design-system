import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
hljs.registerLanguage('css', css);
hljs.highlightAll();

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
