describe('CardControl', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--card-control');
    cy.get('.form-check-input', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Card Controls (Standard HTML)', { widths: [1440] });
  });

  it('post-card-control', () => {
    cy.visit('/iframe.html?id=snapshots--post-card-control');
    cy.get('post-card-control[data-hydrated]', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Card Controls (Web Component)', { widths: [1440] });
  });
});
