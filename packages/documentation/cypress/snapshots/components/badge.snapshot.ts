describe('Badge', () => {
    it('default', () => {
      cy.visit('/iframe.html?id=snapshots--badge');
      cy.get('.badge').should('be.visible');
      cy.percySnapshot('Badges', { widths: [400] });
    });
  });
