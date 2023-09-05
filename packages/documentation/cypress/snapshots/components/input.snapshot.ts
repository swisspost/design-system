describe('Input', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--input');
    cy.percySnapshot('Inputs', { widths: [320, 1024] });
  });
});
