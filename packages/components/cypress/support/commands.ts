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

Cypress.Commands.add('getComponent', (component: string, id: string, story = 'default') => {
  cy.getComponents(id, story, component);
});

Cypress.Commands.add('getComponents', (id: string, story: string, ...components: string[]) => {
  cy.visit(`/iframe.html?id=${id}--${story}`);

  components.forEach(component => {
    const alias = component.replace(/^post-/, '');
    cy.get(`post-${alias}:is(.hydrated, [data-hydrated])`, { timeout: 30000 }).as(alias);
  });

  cy.injectAxe();
});

Cypress.Commands.add('getSnapshots', (story: string) => {
  cy.visit(`/iframe.html?id=snapshots--${story}`);

  const alias = story.replace(/^post-/, '');
  cy.get(`post-${alias}:is(.hydrated, [data-hydrated])`, { timeout: 30000 }).as(alias);

  cy.injectAxe();
});

Cypress.Commands.add(
  'checkAriaExpanded',
  (controlledElementSelector: string, isExpanded: 'true' | 'false') => {
    cy.get(controlledElementSelector)
      .invoke('attr', 'id')
      .then(id => {
        cy.get(`[aria-controls="${id}"]`).should('have.attr', 'aria-expanded', isExpanded);
      });
  },
);

Cypress.Commands.add(
  'checkFormDataPropValue',
  ($form: JQuery<HTMLElement>, key: string, value: any) => {
    const formControlData = new FormData($form.get(0) as HTMLFormElement).get(key);
    expect(formControlData).to.be.eq(value);
  },
);
