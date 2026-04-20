describe('Display', () => {
  it('display', () => {
    cy.visit('/iframe.html?id=snapshots--display');
    cy.get('.display-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Display', { widths: [320, 1440] });
  });
});
