describe('Alert', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--alert');
    cy.get('.alert', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Alerts (Standard HTML)', { widths: [320, 1440] });
  });

  it('post-alert', () => {
    cy.visit('/iframe.html?id=snapshots--post-alert');
    cy.get('post-alert', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Alerts (Web Component)', { widths: [320, 1440] });
  });
});
