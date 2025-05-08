import { CSP_NONCE, inject, NgModule, provideEnvironmentInitializer } from '@angular/core';
import { defineCustomElements, setNonce } from '@swisspost/design-system-components/loader';

import { DIRECTIVES } from './stencil-generated';
import { PostCardControlCheckboxValueAccessorDirective } from './custom/value-accessors/post-card-control-checkbox-value-accessor';
import { PostCardControlRadioValueAccessorDirective } from './custom/value-accessors/post-card-control-radio-value-accessor';

const IMPORTS = [
  ...DIRECTIVES,
  PostCardControlCheckboxValueAccessorDirective,
  PostCardControlRadioValueAccessorDirective,
];

@NgModule({
  imports: IMPORTS,
  exports: IMPORTS,
  providers: [
    provideEnvironmentInitializer(() => {
      const initializerFn = (() => () => {
        // Check if Post components are already defined, if so do nothing
        if (typeof customElements.get('post-icon') !== 'undefined') return;

        // Set a "nonce" attribute on all scripts/styles if the host application has one configured
        const nonce = inject(CSP_NONCE);
        if (nonce) setNonce(nonce);

        // Define Post components
        defineCustomElements();
      })();
      return initializerFn();
    }),
  ],
})
export class PostComponentsModule {}
