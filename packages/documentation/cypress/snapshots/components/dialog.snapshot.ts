describe('Dialog', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--dialog');
    cy.get('dialog[open]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Dialog', { widths: [1440] });
  });
});
