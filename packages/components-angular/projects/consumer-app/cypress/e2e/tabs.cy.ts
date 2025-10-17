import { setupComponentErrorCapture, assertNoComponentErrors } from '../support/component-error-filter';

const TAB_COMPONENTS = ['post-tabs', 'post-tab-item', 'post-tab-panel'];

describe('Tabs', () => {
  beforeEach(() => {
    cy.visit('/tabs');
  });

  describe('Panel mode', () => {
    it('should render tabs component', () => {
      cy.get('post-tabs').first().should('exist');
      cy.get('post-tabs').first().should('be.visible');
    });

    it('should render tab items', () => {
      cy.get('post-tabs').first().find('post-tab-item').should('have.length.at.least', 1);
    });

    it('should render tab panels', () => {
      cy.get('post-tabs').first().find('post-tab-panel').should('have.length.at.least', 1);
    });

    it('should not have console errors from tabs components', () => {
      const errorCapture = setupComponentErrorCapture(TAB_COMPONENTS);
      
      cy.visit('/tabs', {
        onBeforeLoad: errorCapture.onBeforeLoad
      });
      
      cy.get('post-tabs').first().should('be.visible');
      
      cy.wait(500);
      
      assertNoComponentErrors(errorCapture.errors, TAB_COMPONENTS);
    });

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
    it('should render tabs component', () => {
      cy.get('post-tabs').last().should('exist');
      cy.get('post-tabs').last().should('be.visible');
    });

    it('should render tab items with anchor links', () => {
      cy.get('post-tabs').last().find('post-tab-item').should('have.length.at.least', 1);
      cy.get('post-tabs').last().find('post-tab-item a').should('exist');
    });

    it('should not have console errors from tabs components', () => {
      const errorCapture = setupComponentErrorCapture(TAB_COMPONENTS);
      
      cy.visit('/tabs', {
        onBeforeLoad: errorCapture.onBeforeLoad
      });
      
      cy.get('post-tabs').last().should('be.visible');
      
      cy.wait(500);
      
      assertNoComponentErrors(errorCapture.errors, TAB_COMPONENTS);
    });
  });
});
