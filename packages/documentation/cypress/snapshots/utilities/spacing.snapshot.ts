describe('Spacing', () => {
  it('margin and padding', () => {
    cy.visit('/iframe.html?id=snapshots--margin-and-padding');
    cy.get('.margin-padding-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Margin and Padding', { widths: [320, 1440] });
  });

  it('gap', () => {
    cy.visit('/iframe.html?id=snapshots--gap');
    cy.get('.gap-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Gap', { widths: [320, 1440] });
  });
});
