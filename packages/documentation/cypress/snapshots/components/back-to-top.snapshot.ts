describe('Button', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--back-to-top');
    cy.get('button post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Buttons', { widths: [1440] });
  });
});
