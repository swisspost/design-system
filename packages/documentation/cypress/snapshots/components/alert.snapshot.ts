describe('Alert', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--alert');
    cy.get('.alert').should('be.visible');
    cy.percySnapshot('Alerts', { widths: [320, 1440] });
  });
});
