describe('Overflow', () => {
  it('overflow', () => {
    cy.visit('/iframe.html?id=snapshots--overflow');
    cy.get('.overflow-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Overflow', { widths: [320, 1440] });
  });
});
