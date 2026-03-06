describe('toast', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visit(`/iframe.html?id=825b65c9-7eaf-4e0a-9e20-5f5ed406726d--auto-close`);
      cy.get('button.btn', { timeout: 30000 }).as('triggerCreateToast');
    });

    it('should hide on close button click', () => {
      cy.get('@triggerCreateToast').click();
      cy.get('.toast').should('exist');
      cy.get('.toast-close-button').click();
      cy.get('.toast').should('not.exist');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--toast');
      cy.get('.toast', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner');
    });
  });
});
