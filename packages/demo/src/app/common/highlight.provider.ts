import { Injectable } from '@angular/core';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@Injectable()
export class HighlightProvider {
  public static Config = {
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      fullLibraryLoader: () =>
        import('highlight.js')
          .then(lib => {
            return lib;
          })
          .catch(e => console.log(e)),
    },
  };
}
