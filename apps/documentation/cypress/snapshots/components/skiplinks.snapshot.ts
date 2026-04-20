describe('Skiplinks', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=2fc3b456-19ba-4ede-b1bc-499518f829b1--default');
    cy.get('.skiplinks-container', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Skiplinks', { widths: [1440] });
  });
});
