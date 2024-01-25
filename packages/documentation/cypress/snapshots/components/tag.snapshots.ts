describe('Tag', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--tag');
    cy.get('.tag', { timeout: 3000 }).should('be.visible');
    cy.percySnapshot('Alerts (Standard HTML)', { widths: [1440] });
  });

  it('post-tag', () => {
    cy.visit('/iframe.html?id=snapshots--post-tag');
    cy.get('post-tag post-icon', { timeout: 3000 }).should('be.visible');
    cy.percySnapshot('Alerts (Web Component)', { widths: [1440] });
  });
});
