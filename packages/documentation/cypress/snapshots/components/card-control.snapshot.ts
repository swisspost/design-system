describe('CardControl', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--card-control');
    cy.get('.form-check-input', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Card Controls (Standard HTML)', { widths: [1440] });
  });
});
