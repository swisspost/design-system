describe('header', () => {
  it('default', () => {
    cy.visit('/iframe.html?args=&id=components-internet-header-header--default');
    cy.get('swisspost-internet-header.hydrated');
    cy.percySnapshot('Header');
  });
});
