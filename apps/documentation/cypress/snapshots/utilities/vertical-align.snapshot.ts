describe('Vetical Align', () => {
  it('vertica-align', () => {
    cy.visit('/iframe.html?id=snapshots--vertical-align');
    cy.get('.vertical-align-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Vertical Align', { widths: [1440] });
  });
});
