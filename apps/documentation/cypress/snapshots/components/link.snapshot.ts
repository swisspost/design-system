describe('Link', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--link');
    cy.get('a', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Links', { widths: [400] });
  });
});
