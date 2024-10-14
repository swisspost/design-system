describe('Borders', () => {
  it('borders', () => {
    cy.visit('/iframe.html?id=snapshots--borders');
    cy.get('.borders-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Borders', { widths: [320, 1440] });
  });

  it('rounded', () => {
    cy.visit('/iframe.html?id=snapshots--rounded');
    cy.get('.borders-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Rounded', { widths: [320, 1440] });
  });
});
