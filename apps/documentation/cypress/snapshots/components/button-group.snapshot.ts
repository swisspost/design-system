describe('Button-group', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--button-group');
    cy.get('button', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Button-group', { widths: [1440] });
  });
});
