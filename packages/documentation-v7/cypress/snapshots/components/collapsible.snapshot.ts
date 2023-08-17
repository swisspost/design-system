describe('Collapsible', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--collapsible');
    cy.get('post-collapsible.hydrated').should('be.visible');
    cy.percySnapshot('Collapsible');
  });
});
