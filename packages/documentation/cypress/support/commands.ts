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

Cypress.Commands.add('registerCollapsibleFrom', (url: string) => {
  cy.visit(url);
  cy.get('post-collapsible').as('collapsible');
  cy.get('@collapsible').find('.collapse').as('collapse');
});

Cypress.Commands.add('checkVisibility', (visibility: 'visible' | 'hidden') => {
  cy.get('@collapse').should('not.have.class', 'collapsing').and(`be.${visibility}`);
});

Cypress.Commands.add('checkAriaExpanded', (isExpanded: 'true' | 'false') => {
  cy.get('@collapse')
    .should('not.have.class', 'collapsing')
    .invoke('attr', 'id')
    .then(id => {
      cy.get(`[aria-controls="${id}"]`).should('have.attr', 'aria-expanded', isExpanded);
    });
});

Cypress.Commands.add('enableForcedColors', (theme: 'light' | 'dark') => {
  const cdpCommand = 'Emulation.setEmulatedMedia';
  const media = 'forced-colors';

  return cy
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: cdpCommand,
        params: {
          media,
          features: [
            { name: media, value: 'active' },
            { name: 'prefers-color-scheme', value: theme },
          ],
        },
      });
    })
    .then(() => {
      Cypress.log({
        name: 'Enable forced colors',
        message: `${theme} theme`,
      });
    })
    .window();
});

Cypress.Commands.add('disableForcedColors', () => {
  const cdpCommand = 'Emulation.setEmulatedMedia';
  const media = 'forced-colors';

  return cy
    .then(() => {
      return Cypress.automation('remote:debugger:protocol', {
        command: cdpCommand,
        params: {
          media,
          features: [{ name: media, value: 'none' }],
        },
      });
    })
    .then(() => {
      Cypress.log({
        name: 'Disable forced colors',
      });
    })
    .window();
});
