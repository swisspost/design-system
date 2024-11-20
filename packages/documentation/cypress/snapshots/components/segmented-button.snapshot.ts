describe('Segmented-button', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--segmented-button');
    cy.get('button', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Segmented-button', { widths: [1440] });
  });
});
