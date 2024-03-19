describe('Card', () => {
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--card');
      cy.get('.card post-icon', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner', {
        rules: {
          'heading-order': {
            enabled: false,
          },
          'aria-prohibited-attr': {
            // aria-label attribute is used as a prop on post-icon
            enabled: false,
          },
        },
      });
    });
  });
});
