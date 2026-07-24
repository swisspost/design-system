describe('Inline Notification', () => {
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--inline-notification');
      cy.get('.inline-notification', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    describe('Snapshots', () => {
      it('supports multi-line layout without additional classes', () => {
        cy.get('.inline-notification .inline-notification-content')
          .first()
          .should('have.css', 'display', 'grid');
      });

      it('renders all variants with and without title', () => {
        cy.percySnapshot('Inline Notification - All Variants');
      });
    });
  });
});
