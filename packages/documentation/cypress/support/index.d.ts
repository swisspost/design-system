declare global {
  namespace Cypress {
    interface Chainable {
      waitForElement(selector: string): Chainable<any>;
      waitForIconInElement(selector: string): Chainable<any>;
      waitForComponent(selector: string): Chainable<any>;
      waitForIconInComponent(selector: string): Chainable<any>;
      waitForIconInComponentShadow(selector: string): Chainable<any>;
    }
  }
}

export {};
