describe('Collapsible', () => {
  it('default', () => {
    cy.visit('/iframe.html?args=&id=components-collapsible--default');
    cy.get('post-collapsible.hydrated');
    cy.percySnapshot('Collapsible');
  });
});
