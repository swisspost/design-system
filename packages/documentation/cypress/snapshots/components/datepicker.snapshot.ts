describe('Datepicker', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--datepicker');
    cy.get('post-datepicker', { timeout: 30000 }).should('be.visible');
  });
});
