describe('Visibility', () => {
  it('visibility', () => {
    cy.visit('/iframe.html?id=snapshots--visibility');
    cy.get('.container-examples', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Visibility', { widths: [1440] });
  });
});
