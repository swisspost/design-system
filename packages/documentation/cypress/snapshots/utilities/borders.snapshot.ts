describe('Borders', () => {
  it('borders', () => {
    cy.visit('/iframe.html?id=snapshots--borders');
    cy.get('.border-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Borders', { widths: [1440] });
  });

  it('rounded', () => {
    cy.visit('/iframe.html?id=snapshots--rounded');
    cy.get('.border-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Rounded', { widths: [1440] });
  });
});
