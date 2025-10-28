import { setupComponentErrorCapture, assertNoComponentErrors } from '../support/component-error-filter';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';

describe('Components', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  componentNames.forEach(componentName => {
    it(`should contain <${componentName}>`, () => {
      cy.get('body').then($body => {
        if ($body.find(componentName).length > 0) {
          cy.get(componentName).first().should('exist');
        }
      });
    });
  });

  componentNames.forEach(componentName => {
    it(`should render and be attached: <${componentName}>`, () => {
      cy.get('body').then($body => {
        if ($body.find(componentName).length > 0) {
          cy.get(componentName).first().should('exist');
        }
      });
    });
  });

  it('should not have console errors from components', () => {
    const errorCapture = setupComponentErrorCapture(componentNames);
    
    cy.visit('/', {
      onBeforeLoad: errorCapture.onBeforeLoad
    });
    
    cy.wait(500);
    
    assertNoComponentErrors(errorCapture.errors, componentNames);
  });
});
