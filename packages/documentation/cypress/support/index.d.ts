declare global {
  namespace Cypress {
    interface Chainable {
      registerCollapsibleFrom(url: string): Chainable<any>;
      checkVisibility(visibility: 'visible' | 'hidden'): Chainable<any>;
      checkAriaExpanded(isExpanded: 'true' | 'false'): Chainable<any>;
      enableForceColors(theme: 'light' | 'dark'): Chainable<any>;
      disableForceColors(): Chainable<any>;
    }
  }
}

export {};
