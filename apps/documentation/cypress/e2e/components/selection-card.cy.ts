describe('Choice-card', () => {
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--selection-card');
      cy.get('.selection-card', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner', {
        rules: {
          'color-contrast': {
            enabled: false,
          },
        },
      }, (violations) => {
        expect(violations).to.have.length(0);
      });
    });
  });
});
