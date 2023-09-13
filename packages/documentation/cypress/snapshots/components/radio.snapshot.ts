describe('Radio', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--radio');
    cy.percySnapshot('Radios', { widths: [400] });
  });
});
