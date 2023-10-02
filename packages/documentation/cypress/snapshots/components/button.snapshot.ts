describe('Button', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--button');
    cy.get('button post-icon', { timeout: 30000 }).should('be.visible').pause();
    cy.percySnapshot('Buttons', { widths: [1440] });
  });
});
