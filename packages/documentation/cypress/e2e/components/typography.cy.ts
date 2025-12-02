describe('Typography', () => {
  describe('Accessibility', () => {
    beforeEach(() => {
      cy.visit('/iframe.html?id=snapshots--typography');
      cy.get('h1', { timeout: 30000 }).should('be.visible');
      cy.get('a', { timeout: 30000 }).should('be.visible');
      cy.get('p', { timeout: 30000 }).should('be.visible');
      cy.get('legend', { timeout: 30000 }).should('be.visible');
      // Test Inline Elements
      cy.get('small', { timeout: 30000 }).should('be.visible');
      cy.get('strong', { timeout: 30000 }).should('be.visible');
      cy.get('em', { timeout: 30000 }).should('be.visible');
      cy.get('sub', { timeout: 30000 }).should('be.visible');
      cy.get('sup', { timeout: 30000 }).should('be.visible');
      cy.get('mark', { timeout: 30000 }).should('be.visible');
      cy.get('abbr', { timeout: 30000 }).should('be.visible');
      cy.get('code', { timeout: 30000 }).should('be.visible');
      cy.get('kbd', { timeout: 30000 }).should('be.visible');
      cy.get('del', { timeout: 30000 }).should('be.visible');
      cy.get('hr', { timeout: 30000 }).should('be.visible');
      cy.injectAxe();
    });

    it('Has no detectable a11y violations on load for all variants', () => {
      cy.checkA11y('#root-inner');
    });
  });
});
