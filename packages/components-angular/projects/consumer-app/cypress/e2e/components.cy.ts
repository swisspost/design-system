import { setupComponentErrorCapture, assertNoComponentErrors } from '../support/component-error-filter';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';

describe('Components', () => {
  componentNames.forEach(componentName => {
    describe(componentName, () => {
      beforeEach(() => {
        cy.visit('/');
      });

      it('Angular consumer-app should contain the component', () => {
        cy.get(componentName).first().should('exist');
      });

      it('the component should be hydrated', () => {
        cy.get(componentName).first().should('have.class', 'hydrated');
      });

      it('the component should not have console errors', () => {
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
});