import { setupComponentErrorCapture, assertNoComponentErrors } from '../support/component-error-filter';

const TAB_COMPONENTS = ['post-tabs', 'post-tab-item', 'post-tab-panel'];

describe('Tabs - Specific Behavior', () => {
  beforeEach(() => {
    cy.visit('/tabs');
  });

  describe('Panel mode', () => {
    it('should switch between tabs without errors', () => {
      const errorCapture = setupComponentErrorCapture(TAB_COMPONENTS);
      
      cy.visit('/tabs', {
        onBeforeLoad: errorCapture.onBeforeLoad
      });
      
      cy.get('post-tabs').first().find('post-tab-item').each(($tab) => {
        cy.wrap($tab).click();
        cy.wait(100);
      });
      
      cy.wait(200);
      
      assertNoComponentErrors(errorCapture.errors, TAB_COMPONENTS);
    });
  });

  describe('Navigation mode', () => {
    it('should navigate when clicking anchor links without errors', () => {
      const errorCapture = setupComponentErrorCapture(TAB_COMPONENTS);
      
      cy.visit('/tabs', {
        onBeforeLoad: errorCapture.onBeforeLoad
      });
      
      cy.get('post-tabs').last().find('post-tab-item a').first().click();
      
      cy.wait(200);
      
      assertNoComponentErrors(errorCapture.errors, TAB_COMPONENTS);
    });
  });
});
