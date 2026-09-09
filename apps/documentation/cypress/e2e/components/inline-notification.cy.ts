describe('Inline Notification', () => {
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--inline-notification');
      cy.get('.inline-notification', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    it('has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner', undefined, (violations) => {
        expect(violations).to.have.length(0);
      });
    });

    it('renders all variants with and without title', () => {
      cy.get('.inline-notification').should('have.length.at.least', 1);
      cy.percySnapshot('Inline Notification - All Variants');
    });
  });
});
