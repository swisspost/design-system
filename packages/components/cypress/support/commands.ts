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
    cy.get(`post-${alias}[data-hydrated]`, { timeout: 30000 }).as(alias);
  });

  cy.injectAxe();
});

Cypress.Commands.add('getSnapshots', (story: string) => {
  cy.visit(`/iframe.html?id=snapshots--${story}`);

  const alias = story.replace(/^post-/, '');
  cy.get(`post-${alias}[data-hydrated]`, { timeout: 30000 }).as(alias);

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
  ($form: JQuery<HTMLElement>, key: string, value: string | number | boolean | null) => {
    const formControlData = new FormData($form.get(0) as HTMLFormElement).get(key);
    expect(formControlData).to.be.eq(value);
  },
);

Cypress.Commands.add(
  'getFocusableElements',
  { prevSubject: true },
  (subject: JQuery<HTMLElement>) => {
    const focusableSelector = `:where(${[
      'button',
      'input:not([type="hidden"])',
      '[tabindex]',
      'select',
      'textarea',
      '[contenteditable]',
      'a[href]',
      'iframe',
      'audio[controls]',
      'video[controls]',
      'area[href]',
      'details > summary:first-of-type',
    ].join(',')})`;

    const focusDisablingSelector = `:where(${[
      '[inert]',
      '[inert] *',
      ':disabled',
      'dialog:not([open]) *',
      '[popover]:not(:popover-open) *',
      'details:not([open]) > *:not(details > summary:first-of-type)',
      'details:not([open]) > *:not(details > summary:first-of-type) *',
      '[tabindex^="-"]',
      '[hidden]:not([hidden="false"])',
    ].join(',')})`;

    function isElementFocusable(node: Element): node is HTMLElement {
      return (
        node instanceof HTMLElement &&
        node.matches(`${focusableSelector}:not(${focusDisablingSelector})`)
      );
    }

    function collect(
      el: Element | DocumentFragment,
      visited: Set<Node> = new Set(),
    ): HTMLElement[] {
      if (visited.has(el)) return [];
      visited.add(el);

      let nodes: Element[];
      if (el instanceof HTMLSlotElement) {
        const assigned = el.assignedElements({ flatten: true });
        nodes = assigned.length > 0 ? assigned : Array.from(el.children);
      } else if (el instanceof HTMLElement && el.shadowRoot) {
        nodes = Array.from(el.shadowRoot.children);
      } else {
        nodes = Array.from(el.children);
      }

      const result: HTMLElement[] = [];
      for (const node of nodes) {
        if (isElementFocusable(node)) {
          result.push(node);
          continue;
        }
        result.push(...collect(node, visited));
      }
      return result;
    }

    return cy.wrap(collect(subject[0]));
  },
);
