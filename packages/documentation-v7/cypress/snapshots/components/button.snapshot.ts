describe('Button', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=hidden-snapshots-components--button');
    cy.percySnapshot('Buttons', { widths: [1440] });
  });
});
