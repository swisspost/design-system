describe('Sizing', () => {
  it('Sizing', () => {
    cy.visit('/iframe.html?id=snapshots--sizing');
    cy.get('.sizing-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Sizing', { widths: [320, 1440] });
  });
  it('SizingVp', () => {
    cy.visit('/iframe.html?id=snapshots--sizing-vp');
    cy.get('.sizing-vp-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('SizingVp', { widths: [320, 1440] });
  });
  it('SizingAuto', () => {
    cy.visit('/iframe.html?id=snapshots--sizing-auto');
    cy.get('.sizing-auto-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('SizingAuto', { widths: [320, 1440] });
  });
});
