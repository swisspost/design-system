import testConfiguration from '../fixtures/internet-header/test-configuration.json';
import mockAuth from '../fixtures/internet-header/auth.json';

describe('header attributes', { baseUrl: null }, () => {
  beforeEach(() => {
    cy.intercept('**/v1/session/subscribe', mockAuth).as('auth');
    cy.intercept('**/api/headerjs/Json?serviceid=*', testConfiguration).as('getConfig');
  });

  it('should lowercase the environment attribute', () => {
    cy.visit('./cypress/fixtures/pages/uppercase-environment.html');
    cy.wait('@getConfig').then(interception => {
      expect(interception.request.query['environment']).to.eq('int01');
    });
  });
});
