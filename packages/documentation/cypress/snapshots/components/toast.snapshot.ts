describe('Toast', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--toast');
    cy.get('.toast').should('be.visible');
    cy.percySnapshot('Toasts', { widths: [400, 1024] });
  });
});
