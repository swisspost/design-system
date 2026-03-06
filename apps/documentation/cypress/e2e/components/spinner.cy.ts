describe('Spinner', () => {
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--spinner');
      cy.get('.loader', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner');
    });
  });
});
