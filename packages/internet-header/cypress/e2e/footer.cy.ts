import { prepare } from '../support/prepare-story';

describe('footer', () => {
  describe('config', () => {
    describe('footer config not set', () => {
      it(`removes footer control`, () => {
        prepare('Internet Header/Components/Footer', 'Default');

        // Assert the header is hydrated
        cy.get('swisspost-internet-footer').should('have.class', 'hydrated');

        // With the modified configuration the footer should be removed from the DOM
        cy.get('.post-internet-footer').should('not.exist');
      });
    });

    describe('custom footer config set', () => {
      it(`shows custom footer links`, async () => {
        prepare('Internet Header/Components/Footer', 'Default');

        const customFooterConfig = {
          de: {
            footer: {
              block: {
                title: 'Eigene Footer-Konfiguration',
                links: [
                  { url: 'https://fireship.io', text: 'Fireship.io', target: '_blank' },
                  { url: 'https://css-tricks.com', text: 'CSS-Tricks', target: '_blank' },
                  { url: 'https://web.dev', text: 'web.dev', target: '_blank' },
                  { url: 'https://developer.mozilla.org', text: 'MDN Web Docs', target: '_blank' },
                  { url: 'https://getbootstrap.com', text: 'Bootstrap', target: '_blank' },
                  { url: 'https://google.com', text: 'Google', target: '_blank' },
                  { url: 'https://microsoft.com', text: 'Microsoft', target: '_blank' },
                ],
              },
            },
          },
        };

        cy.changeArg('custom-config', JSON.stringify(customFooterConfig));

        // With the custom configuration the footer links should be visible
        cy.get('swisspost-internet-footer').should('exist');
        cy.get('.pre-footer')
          .should('exist')
          .and('be.visible')
          .within(() => {
            cy.get('h3').should('contain.text', 'Eigene Footer-Konfiguration');
            cy.get('li').should('have.length', 7);
          });
      });
    });

    describe('header element non-existent', () => {
      it(`removes footer control`, () => {
        // Visit the story with non-existent header
        prepare('Internet Header/Components/Footer', 'Non-existent-header');

        // Without the header, the footer should be removed from the DOM as well
        cy.get('swisspost-internet-footer').should('exist');
        cy.get('.post-internet-footer').should('not.exist');
      });
    });

    describe('external functions test', () => {
      it('should not show cookie settings link when UC_UI is not defined', () => {
        prepare('Internet Header/Components/Footer', 'Default');
        cy.get('.footer-meta-links').should('exist').get('.cookie-settings').should('not.exist');
      });

      it('should show cookie settings when UC_UI is defined', () => {
        prepare('Internet Header/Components/Footer', 'Default');
        cy.window().then(win => {
          win['UC_UI'] = { showSecondLayer: () => 'second layer mock' };
          cy.get('.footer-meta-links').should('exist').get('.cookie-settings').should('exist');
        });
      });
    });
  });
});
