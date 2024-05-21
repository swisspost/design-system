describe('CardControl', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--card-control');
    cy.waitForElement('.form-check-input');
    cy.percySnapshot('Card Controls (Standard HTML)', { widths: [1440] });
  });

  it('post-card-control', () => {
    cy.visit('/iframe.html?id=snapshots--post-card-control');
    cy.waitForIconInComponentShadow('post-card-control');
    cy.percySnapshot('Card Controls (Web Component)', { widths: [1440] });
  });
});
