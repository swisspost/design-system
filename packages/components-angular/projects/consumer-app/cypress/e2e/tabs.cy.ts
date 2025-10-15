describe('Tabs', () => {
  beforeEach(() => {
    cy.visit('/tabs', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'error').as('consoleError');
      }
    });
  });

  it('should render tabs components without errors', () => {
    cy.get('post-tabs').first().should('be.visible');
    cy.get('post-tabs').last().should('be.visible');
    
    cy.get('@consoleError').should('not.be.called');
  });
});