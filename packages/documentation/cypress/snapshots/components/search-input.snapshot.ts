describe('Search Input', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--search-input');
    cy.get('.search-input', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Search Input', { widths: [400] });
  });
})