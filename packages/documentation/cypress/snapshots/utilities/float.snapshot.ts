describe('Float', () => {
  it('float', () => {
    cy.visit('/iframe.html?id=snapshots--float');
    cy.get('.float-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Float', { widths: [320, 400, 600, 780, 1024, 1280, 1440] });
  });
});
