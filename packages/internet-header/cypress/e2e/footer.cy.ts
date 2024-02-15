import { prepare } from '../support/prepare-story';

describe('footer', () => {
  describe('config', () => {
    describe('custom footer config set', () => {
      it(`shows custom footer links`, async () => {
        prepare('27fc009d-3eec-43a9-b3a2-55531e721817', 'Default');

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

    describe('external functions test', () => {
      it('should not show cookie settings link when UC_UI is not defined', () => {
        prepare('27fc009d-3eec-43a9-b3a2-55531e721817', 'Default');
        cy.get('.footer-meta-links').should('exist').get('.cookie-settings').should('not.exist');
      });

      it('should show cookie settings when UC_UI is defined', () => {
        prepare('27fc009d-3eec-43a9-b3a2-55531e721817', 'Default');
        cy.window().then(win => {
          win['UC_UI'] = { showSecondLayer: () => 'second layer mock' };
          cy.get('.footer-meta-links').should('exist').get('.cookie-settings').should('exist');
        });
      });
    });
  });
});
