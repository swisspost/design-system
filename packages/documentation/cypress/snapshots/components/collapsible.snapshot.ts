describe('Collapsible', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=components-collapsible--default');
    cy.get('post-collapsible.hydrated').should('be.visible');
    cy.percySnapshot('Collapsible');
  });
});
