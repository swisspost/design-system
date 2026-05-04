describe('Header', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=ebb11274-091b-4cb7-9a3f-3e0451c9a865--default');
    cy.get('swisspost-internet-header[data-hydrated].header-loaded', { timeout: 30000 }).should(
      'be.visible',
    );
    cy.percySnapshot('Header', { widths: [1440] });
  });
});
