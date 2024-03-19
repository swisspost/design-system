describe('Checkbox', () => {
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--checkbox');
      cy.get('.form-check', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner', {
        rules: {
          'duplicate-id-aria': {
            enabled: false,
          },
        },
      });
    });
  });
});
