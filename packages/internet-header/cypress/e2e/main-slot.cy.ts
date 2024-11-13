import { prepare } from '../support/prepare-story';
import { HEADER, HEADER_CUSTOM_CONTENT } from './shared/variables';

describe('main-navigation', () => {
  describe('slotted element: false', () => {
    beforeEach(() => {
      prepare(HEADER, 'Default');
    });

    it('should not have any custom content', () => {
      cy.get('swisspost-internet-header').find('[slot=main]').should('not.exist');
      cy.get('swisspost-internet-header')
        .shadow()
        .find('.main-navigation-custom-content')
        .should('not.exist');
    });
  });

  describe('slotted element: true', () => {
    beforeEach(() => {
      prepare(HEADER_CUSTOM_CONTENT, 'Default');

      cy.get('swisspost-internet-header').find('[slot=main]').as('slotted-element');
      cy.get('swisspost-internet-header')
        .shadow()
        .find('.main-navigation-custom-content')
        .as('custom-content');
    });

    it('should have custom content', () => {
      cy.get('@slotted-element').should('exist');
      cy.get('@custom-content').should('exist');
    });

    it('should show custom content on mobile', () => {
      cy.viewport('iphone-6+');
      cy.get('@custom-content').should('exist');
    });

    it('should show custom content before the search', () => {
      cy.get('@custom-content').next().should('have.prop', 'tagName').should('eq', 'POST-SEARCH');
    });

    it('should show custom content before the login when the search is disabled', () => {
      cy.changeArg('search', false);

      cy.get('@custom-content')
        .next()
        .should('have.prop', 'tagName')
        .should('eq', 'POST-KLP-LOGIN-WIDGET');
    });

    it('should show custom content before the language switch when the search, login and meta are disabled', () => {
      cy.changeArg('meta', false);
      cy.changeArg('search', false);
      cy.changeArg('login', false);

      cy.get('@custom-content')
        .next()
        .should('have.prop', 'tagName')
        .should('eq', 'POST-LANGUAGE-SWITCH');
    });

    it('should show a border on the left of the custom content', () => {
      cy.get('@custom-content').should('not.have.css', 'border-left-width', '0px');
    });

    it('should not stretched the header when the slotted element is high', () => {
      cy.get('@custom-content')
        .invoke('outerHeight')
        .then(headerHeight => {
          if (typeof headerHeight === 'undefined')
            throw new Error('No Height found for .main-navigation-custom-content');

          cy.get('@slotted-element').invoke('css', 'height', `${headerHeight + 100}px`);
          cy.get('@custom-content').invoke('outerHeight').should('eq', headerHeight);
        });
    });

    it('should not squash other navigation elements when the slotted element is wide', async () => {
      cy.document().then(document => {
        cy.get('@slotted-element').invoke('css', 'width', `${document.body.clientWidth}px`);
      });

      cy.get('swisspost-internet-header')
        .shadow()
        .get('#post-internet-header-search-button, #post-klp-login-widget')
        .then($navigationControls => {
          cy.get('.main-link').then($mainLinks =>
            $mainLinks.toArray().concat($navigationControls.toArray()),
          );
        })
        .each($el => {
          cy.wrap($el).should(() => {
            const { scrollWidth, clientWidth } = $el.get(0);
            expect(clientWidth).not.to.equal(0);
            expect(scrollWidth).not.to.be.greaterThan(clientWidth);
          });
        });
    });
  });
});
