import { setupComponentErrorCapture, assertNoComponentErrors } from '../support/component-error-filter';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';

describe('Components', () => {
  let errorCapture: ReturnType<typeof setupComponentErrorCapture>;

  beforeEach(() => {
    errorCapture = setupComponentErrorCapture(componentNames);
    
    cy.visit('/', {
      onBeforeLoad: errorCapture.onBeforeLoad
    });
  });

  componentNames.forEach(componentName => {
    it(`should contain <${componentName}>`, () => {
      cy.get(componentName).first().should('exist');
    });
  });

  componentNames.forEach(componentName => {
    it(`should be hydrated: <${componentName}>`, () => {
      cy.get(componentName).first().should('have.class', 'hydrated');
    });
  });

  componentNames.forEach(componentName => {
    it(`should not have console errors from component: <${componentName}>`, () => {
      // Note: We must use cy.visit() instead of cy.reload() here because cy.reload() 
      // does not support the onBeforeLoad option needed to re-register the error capture hook
      cy.visit('/', {
        onBeforeLoad: errorCapture.onBeforeLoad
      });

      // Wait for the component to hydrate and any asynchronous errors to surface
      cy.wait(500);

      assertNoComponentErrors(errorCapture.errors, [componentName]);
    });
  });
});