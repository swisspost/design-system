describe('Headings', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--heading');
    cy.get('h1').should('be.visible');
    cy.percySnapshot('Headings', { widths: [1024] });
  });
});
