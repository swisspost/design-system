describe('Internet-Header', () => {
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=ebb11274-091b-4cb7-9a3f-3e0451c9a865--default');
      cy.get('swisspost-internet-header[data-hydrated]', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner');
    });
  });
});
