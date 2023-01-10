import testConfiguration from '../../../src/assets/config/test-configuration.json';
import mockAuth from '../../fixtures/auth.json';

describe('header', () => {
  before(() => {
    cy.visitStorybook();
  });

  beforeEach(() => {
    cy.intercept('**/api/headerjs/Json?serviceid=*', testConfiguration).as('getConfig');
    cy.intercept('**/v1/session/subscribe', mockAuth).as('auth');
    cy.loadStory('Header', 'Default');
  });

  context('initial state', () => {
    it('renders', () => {
      cy.get('swisspost-internet-header').should('have.class', 'hydrated');
    });

    it(`has title 'CWF Internet Header'`, () => {
      cy.get('h1').should('contain.text', 'CWF Internet Header');
    });

    it(`has nav item 'Briefe versenden' selected`, () => {
      cy.changeArg('active-route', 'https://post.ch/de/briefe-versenden');
      cy.get('swisspost-internet-header')
        .shadow()
        .find('post-main-navigation')
        .shadow()
        .find('.main-link.active')
        .should('contain.text', 'Briefe versenden');
    });

    it(`has nav item 'Briefe versenden' selected (works with includeShadowDom: true)`, () => {
      cy.changeArg('active-route', 'https://post.ch/de/briefe-versenden');
      cy.get('.main-link.active').should('contain.text', 'Briefe versenden');
    });

    it('renders in full screen mode', () => {
      cy.viewport(1920, 1080);
      cy.get('body')
        .then(body => body.outerWidth())
        .then(w => {
          cy.get('.main-navigation-container').invoke('outerWidth').should('be.lessThan', w);
          cy.get('.meta-container').invoke('outerWidth').should('be.lessThan', w);

          cy.changeArg('full-width', true);

          cy.get('.main-navigation-container').invoke('outerWidth').should('equal', w);
          cy.get('.meta-container').invoke('outerWidth').should('equal', w);
        });
    });
  });
});
