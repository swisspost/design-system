describe('Range', () => {
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--range');
      cy.get('.form-range', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner', {
        rules: {
          'color-contrast': {
            enabled: false,
          },
          'duplicate-id-aria': {
            enabled: false,
          },
        },
      });
    });
  });
});
