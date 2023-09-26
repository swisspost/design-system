describe('Alert', () => {
  it('default', () => {
    cy.visit('./iframe.html?id=snapshots--alert');
    cy.percySnapshot('Alerts (Standard HTML)', { widths: [320, 1440] });
  });

  it('post-alert', () => {
    cy.visit('./iframe.html?id=snapshots--post-alert');
    cy.percySnapshot('Alerts (Web Component)', { widths: [320, 1440] });
  });
});
