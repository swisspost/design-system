import {
  CSP_NONCE,
  inject,
  EnvironmentProviders,
  makeEnvironmentProviders,
  provideEnvironmentInitializer,
} from '@angular/core';
import { defineCustomElements, setNonce } from '@swisspost/design-system-components/loader';
import { DIRECTIVES } from './stencil-generated';

export function providePostComponents(): EnvironmentProviders {
  return makeEnvironmentProviders([
    ...DIRECTIVES,

    provideEnvironmentInitializer(() => () => {
      // Check if Post components are already defined, if so do nothing
      if (typeof customElements.get('post-icon') !== 'undefined') return;

      // Set a "nonce" attribute on all scripts/styles if the host application has one configured
      const nonce = inject(CSP_NONCE, { optional: true });
      if (nonce) setNonce(nonce);

      // Define Post components
      defineCustomElements();
    }),
  ]);
}
