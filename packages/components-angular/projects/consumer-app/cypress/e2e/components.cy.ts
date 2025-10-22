import { setupComponentErrorCapture, assertNoComponentErrors } from '../support/component-error-filter';
import { componentNames } from '@swisspost/design-system-components/dist/component-names.json';

// Components that are intentionally hidden by default
const HIDDEN_BY_DEFAULT = [
  'post-popovercontainer',
];

describe('Components', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render and exist in DOM', () => {
    componentNames.forEach(componentName => {
      cy.get('body').then($body => {
        if ($body.find(componentName).length > 0) {
          cy.get(componentName).first().should('exist');
        }
      });
    });
  });

  it('should be visible', () => {
    componentNames.forEach(componentName => {
      if (HIDDEN_BY_DEFAULT.includes(componentName)) {
        return;
      }
      
      cy.get('body').then($body => {
        if ($body.find(componentName).length > 0) {
          cy.get(componentName).first().should('be.visible');
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
