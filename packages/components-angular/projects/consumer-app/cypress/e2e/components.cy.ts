import { setupComponentErrorCapture, assertNoComponentErrors } from '../support/component-error-filter';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';

describe('components-angular (consumer-app)', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('components-angular: should contain all components', () => {
    componentNames.forEach(componentName => {
      cy.get(componentName).first().should('exist');
    });
  });

  it('components-angular: all components should be hydrated', () => {
    componentNames.forEach(componentName => {
      cy.get(componentName).first().should('have.class', 'hydrated');
    });
  });

  it('components-angular: should not have console errors', () => {
    const errorCapture = setupComponentErrorCapture(componentNames as string[]);

    cy.visit('/', {
      onBeforeLoad: errorCapture.onBeforeLoad
    });

    assertNoComponentErrors(errorCapture.errors, componentNames as string[]);
  });
});