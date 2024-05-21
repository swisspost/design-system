/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

export const isInViewport = function (_chai: Chai.ChaiStatic) {
  const assertIsInViewport = function (this: Chai.AssertionStatic) {
    const subject = this._obj;

    const windowHeight = Cypress.config().viewportHeight;
    const bottomOfCurrentViewport = windowHeight;
    const rect = subject[0].getBoundingClientRect();

    this.assert(
      (rect.top > 0 && rect.top < bottomOfCurrentViewport) ||
        (rect.bottom > 0 && rect.bottom < bottomOfCurrentViewport),
      'expected #{this} to be in viewport',
      'expected #{this} to not be in viewport',
      subject,
    );
  };

  _chai.Assertion.addMethod('inViewport', assertIsInViewport);
};

chai.use(isInViewport);

Cypress.Commands.add('waitForElement', (selector: string) => {
  cy.get(selector, { timeout: 30000 }).should('be.visible');
});

Cypress.Commands.add('waitForIconInElement', (selector: string) => {
  cy.get(`${selector} post-icon.hydrated`, { timeout: 30000 }).should('be.visible');
});

Cypress.Commands.add('waitForComponent', (name: string) => {
  cy.get(`${name}.hydrated`, { timeout: 30000 })
    .shadow()
    .get('post-icon.hydrated', { timeout: 30000 })
    .should('be.visible');
});

Cypress.Commands.add('waitForIconInComponent', (name: string) => {
  cy.get(`${name}.hydrated post-icon.hydrated`, { timeout: 30000 }).should('be.visible');
});
