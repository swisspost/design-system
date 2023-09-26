describe('Button', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--button');
    cy.get('button', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Buttons', { widths: [1440] });
  });
});
