declare global {
  namespace Cypress {
    interface Chainable {
      getComponent(component: string, story?: string): Chainable<any>;
      checkVisibility(visibility: 'visible' | 'hidden'): Chainable<any>;
      checkAriaExpanded(isExpanded: 'true' | 'false'): Chainable<any>;
    }
  }
}

export {};
