import { setupComponentErrorCapture, assertNoComponentErrors } from '../support/components-error-filter';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';

describe('Components', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  componentNames.forEach(componentName => {
    it(`should contain <${componentName}>`, () => {
      cy.get(componentName).first().should('exist');
    });
  });

  componentNames.forEach(componentName => {
    it(`should render and be attached: <${componentName}>`, () => {
      cy.get(componentName).first().should('have.class', 'hydrated');
    });
  });

  componentNames.forEach(componentName => {
    it(`should not have console errors from component: <${componentName}>`, () => {
      const errorCapture = setupComponentErrorCapture([componentName]);

      cy.visit('/', {
        onBeforeLoad: errorCapture.onBeforeLoad
      });

      // Wait for the component to hydrate and any asynchronous errors to surface
      cy.wait(500);

      assertNoComponentErrors(errorCapture.errors, [componentName]);
    });
  });
});