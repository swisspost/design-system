describe('Sizing', () => {
  it('Sizing Percentages', () => {
    cy.visit('/iframe.html?id=snapshots--percentage-sizing');
    cy.get('.snapshot', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Sizing', { widths: [320, 1440] });
  });

  it('Sizing Pixel Based', () => {
    cy.visit('/iframe.html?id=snapshots--pixel-sizing');
    cy.get('.snapshot', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Sizing', { widths: [320, 1440] });
  });
});
