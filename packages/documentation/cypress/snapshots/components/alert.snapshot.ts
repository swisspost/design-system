describe('Alert', () => {
  it('default', () => {
    cy.visit('/iframe.html?id=snapshots--alert');
    cy.get('.alert post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Alerts (Standard HTML)', { widths: [320, 1440] });
  });

  it('default-HCM-light', () => {
    cy.enableForceColors('light');
    cy.visit('/iframe.html?id=snapshots--alert');
    cy.get('.alert post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Alerts (Standard HTML) – HCM Light', { widths: [320, 1440] });
    cy.disableForceColors();
  });

  it('default-HCM-dark', () => {
    cy.enableForceColors('dark');
    cy.visit('/iframe.html?id=snapshots--alert');
    cy.get('.alert post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Alerts (Standard HTML) – HCM Dark', { widths: [320, 1440] });
    cy.disableForceColors();
  });

  it('post-alert', () => {
    cy.visit('/iframe.html?id=snapshots--post-alert');
    cy.get('post-alert post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Alerts (Web Component)', { widths: [320, 1440] });
  });

  it('post-alert-light', () => {
    cy.enableForceColors('light');
    cy.visit('/iframe.html?id=snapshots--post-alert');
    cy.get('post-alert post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Alerts (Web Component) – HCM Light', { widths: [320, 1440] });
    cy.disableForceColors();
  });

  it('post-alert-dark', () => {
    cy.enableForceColors('dark');
    cy.visit('/iframe.html?id=snapshots--post-alert');
    cy.get('post-alert post-icon', { timeout: 30000 }).should('be.visible');
    cy.percySnapshot('Alerts (Web Component) – HCM Dark', { widths: [320, 1440] });
    cy.disableForceColors();
  });
});
