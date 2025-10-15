describe('Tabs', () => {
  beforeEach(() => {
    cy.visit('/tabs');
  });

  describe('Panel mode', () => {
    it('should render tabs component', () => {
      cy.get('post-tabs').first().should('be.visible');
    });

    it('should not have console errors', () => {
      cy.visit('/tabs', {
        onBeforeLoad(win) {
          cy.spy(win.console, 'error').as('consoleError');
        }
      });

      cy.get('post-tabs').first().should('be.visible');
      cy.get('@consoleError').should('not.be.called');
    });
  });

  describe('Navigation mode', () => {
    it('should render tabs component', () => {
      cy.get('post-tabs').last().should('be.visible');
    });

    it('should not have console errors', () => {
      cy.visit('/tabs', {
        onBeforeLoad(win) {
          cy.spy(win.console, 'error').as('consoleError');
        }
      });

      cy.get('post-tabs').last().should('be.visible');
      cy.get('@consoleError').should('not.be.called');
    });
  });
});
