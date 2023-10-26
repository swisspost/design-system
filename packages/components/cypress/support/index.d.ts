declare global {
  namespace Cypress {
    interface Chainable {
      getComponent(component: string, story?: string): Chainable<unknown>;

      checkVisibility(visibility: 'visible' | 'hidden'): Chainable<unknown>;

      checkAriaExpanded(isExpanded: 'true' | 'false'): Chainable<unknown>;
    }
  }
}

export {};
