describe('Topic teaser', () => {
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--topic-teaser');
      cy.get('.topic-teaser-image', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner');
    });
  });
});
