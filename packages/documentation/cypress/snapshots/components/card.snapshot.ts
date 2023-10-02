describe('Card', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--card');
    cy.get('.card post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Cards', { widths: [1440] });
  });
});
