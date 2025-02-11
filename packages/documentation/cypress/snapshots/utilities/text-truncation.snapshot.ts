describe('Text Truncation', () => {
  it('text truncation', () => {
    cy.visit('/iframe.html?id=snapshots--text-truncation');
    cy.get('.text-truncation-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Text Truncation', { widths: [320, 1440] });
  });
});
