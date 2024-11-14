describe('Back To Top', () => {
  it('back-to-top-light', () => {
    cy.visit('/iframe.html?id=snapshots--back-to-top-light');
    cy.get('.back-to-top-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('BackToTopLight', { widths: [320, 1440] });
  });

  it('back-to-top-dark', () => {
    cy.visit('/iframe.html?id=snapshots--back-to-top-dark');
    cy.get('.back-to-top-example', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('BackToTopDark', { widths: [320, 1440] });
  });
});
