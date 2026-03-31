describe('Inline Notification', () => {
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--inline-notification');
      cy.get('.inline-notification', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner', undefined, violations => {
        violations.forEach(v => {
          console.log(
            v.id,
            v.description,
            v.nodes.map(n => n.html),
          );
        });
      });
    });
  });
});
