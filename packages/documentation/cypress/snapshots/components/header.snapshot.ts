describe('Header', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=internet-header-header-component--default');
    cy.get('swisspost-internet-header.hydrated', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Header', { widths: [1440] });
  });
});
