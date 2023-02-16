describe('header', () => {
  it('default', () => {
    cy.visit('/iframe.html?args=&id=components-internet-header-header--default');
    cy.percySnapshot('Header');
  });
});
