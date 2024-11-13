declare namespace Cypress {
  interface Chainable {
    checkOutputProps($output: JQuery<HTMLElement>, props: {}): Chainable<any>;
  }
}
