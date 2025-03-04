describe('Sizing', () => {
  // Parent based sizing classes [e.g. .quarter, .third, .half, etc.]
  it('Sizing Percentages', () => {
    cy.visit('/iframe.html?id=snapshots--percentage-sizing');
    cy.get('.snapshot', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Sizing', { widths: [320, 1440] });
  });

  // Percentage sizing classes relative to viewport [e.g. vh-25, vw-33, min-vh-50, max-vw-100, etc.]
  it('Sizing Viewport Percentages', () => {
    cy.visit('/iframe.html?id=snapshots--percentage-vp-sizing');
    cy.get('.snapshot', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Sizing', { widths: [320, 1440] });
  });

  // Pixel based sizing classes [e.g. h-80, w-56, max-w-24, min-h-24, etc.]
  it('Sizing Pixel Based', () => {
    cy.visit('/iframe.html?id=snapshots--pixel-sizing');
    cy.get('.snapshot', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Sizing', { widths: [320, 1440] });
  });
});
