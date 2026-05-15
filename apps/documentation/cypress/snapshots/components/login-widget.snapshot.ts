describe('Login Widget', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--login-widget');
    cy.get('post-login-widget', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Login Widget', { widths: [1440] });
  });
});
