describe('Button', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--button');
    cy.get('button').should('be.visible');
    cy.percySnapshot('Buttons', { widths: [1440] });
  });
});
