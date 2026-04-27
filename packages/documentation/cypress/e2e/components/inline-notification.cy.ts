describe('Inline Notification', () => {
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--inline-notification');
      cy.get('.inline-notification', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    describe('Snapshots', () => {
      it('renders all variants with and without title', () => {
        cy.visit('/iframe.html?id=snapshots--inline-notification');
        cy.get('.inline-notification', { timeout: 30000 }).should('be.visible');
        cy.percySnapshot('Inline Notification - All Variants');
      });
    });
  });
});
