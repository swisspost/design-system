describe('Form footer', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--form-footer');
    cy.get('.form-footer post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Form footer', { widths: [320, 1440] });
  });
});
