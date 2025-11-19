import { setupComponentErrorCapture, assertNoComponentErrors } from '../support/component-error-filter';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';

describe('Components', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Angular consumer-app should contain all components', () => {
    componentNames.forEach(componentName => {
      cy.get(componentName).first().should('exist');
    });
  });

  it('all components should be hydrated', () => {
    componentNames.forEach(componentName => {
      cy.get(componentName).first().should('have.class', 'hydrated');
    });
  });

  it('components should not have console errors', () => {
    const errorCapture = setupComponentErrorCapture(componentNames as string[]);

    cy.visit('/', {
      onBeforeLoad: errorCapture.onBeforeLoad
    });

    assertNoComponentErrors(errorCapture.errors, componentNames as string[]);
  });
});