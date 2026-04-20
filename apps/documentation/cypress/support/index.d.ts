declare global {
  namespace Cypress {
    interface Chainable {
      registerCollapsibleFrom(url: string): Chainable<HTMLElement>;
      checkVisibility(visibility: 'visible' | 'hidden'): Chainable<void>;
      checkAriaExpanded(isExpanded: 'true' | 'false'): Chainable<void>;
    }
  }
}

export {};
