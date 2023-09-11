describe('Button', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--button');
    cy.percySnapshot('Buttons', { widths: [1440] });
  });
});
