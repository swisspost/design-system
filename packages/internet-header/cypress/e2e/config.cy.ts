import mockAuth from '../fixtures/internet-header/auth.json';

describe('ppm config', () => {
  beforeEach(() => {});

  it('gets header from script instead of the API', { baseUrl: null }, () => {
    cy.intercept('**/v1/session/subscribe', mockAuth).as('auth');
    cy.intercept('**/api/headerjs/Json?serviceid=*', cy.spy().as('configRequest')).as('getConfig');
    cy.visit('./cypress/fixtures/pages/ppm-config.html');
    cy.get('swisspost-internet-header').should('be.visible');
    cy.get('@configRequest').should('not.have.been.called');
  });
});
