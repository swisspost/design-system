describe('header', () => {
  it('default', () => {
    cy.visit('/iframe.html?args=&id=components-collapsible--default');
    cy.percySnapshot('Home');
  });
});
