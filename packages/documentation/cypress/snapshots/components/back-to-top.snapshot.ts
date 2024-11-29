describe('Back To Top', () => {
  it('back-to-top', () => {
    cy.visit('/iframe.html?id=snapshots--back-to-top');
    cy.get('.back-to-top-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('BackToTopLight', { widths: [320, 1440] });
  });
});
