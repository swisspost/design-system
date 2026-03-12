describe('Number Input', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--number-input');
    cy.get('post-number-input[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Number Inputs', { widths: [1440] });
  });
});
