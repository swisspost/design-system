import { prepare } from '../support/prepare-story';

describe('header', () => {
  beforeEach(() => {
    prepare('ebb11274-091b-4cb7-9a3f-3e0451c9a865', 'Default');
    cy.changeArg('language', 'de');
  });

  context('initial state', () => {
    it('renders', () => {
      cy.get('swisspost-internet-header').should('have.class', 'hydrated');
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

          cy.get('.main-navigation-container').invoke('outerWidth').should('be.within', 1900, 1920);
          cy.get('.meta-container').invoke('outerWidth').should('be.within', 1900, 1920);
        });
    });
  });
});
