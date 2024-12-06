describe('Search', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--search');
    cy.get('.search-input', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Search', { widths: [400] });
  });
})