describe('Blockquote', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--blockquote');
    cy.get('.blockquote', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Blockquotes', { widths: [320, 1440] });
  });
});
