import { prepare } from '../support/prepare-story';
import { FOOTER } from './shared/variables';
import testConfiguration from '../fixtures/internet-header/test-configuration.json';
import { LocalizedConfig } from '../../src/models/general.model';
import { FooterConfig } from '../../src/models/footer.model';

// The footer is position: sticky, so Cypress only considers its content visible once it is in the viewport
const shouldBeVisible = (subject: Cypress.Chainable<JQuery<HTMLElement>>) =>
  subject.each($el => {
    cy.wrap($el).scrollIntoView().should('be.visible');
  });

describe('footer', () => {
  describe('default', () => {
    beforeEach(() => {
      prepare(FOOTER, 'Default');
      cy.get('swisspost-internet-footer[data-hydrated] post-footer[data-hydrated]').should('exist');
    });

    it('should correctly show footer sections', () => {
      const linkCounts = [6, 8, 8, 5];
      shouldBeVisible(cy.get('ul[slot|="grid"]').should('have.length', 4)).each(($el, i) => {
        cy.wrap($el)
          .invoke('attr', 'aria-labelledby')
          .should('not.be.empty')
          .then(id => {
            cy.get(`span[slot="grid-${i + 1}-title"]`)
              .invoke('attr', 'id')
              .should('eq', id);
          });

        shouldBeVisible(cy.wrap($el).find('a').should('have.length', linkCounts[i]));
      });
    });

    it('should correctly show social links', () => {
      shouldBeVisible(cy.get('[slot="socialmedia"] h3'))
        .invoke('attr', 'id')
        .should('not.be.empty')
        .then(id => {
          cy.get('[slot="socialmedia"] ul').invoke('attr', 'aria-labelledby').should('eq', id);
        });

      shouldBeVisible(cy.get('[slot="socialmedia"] a').should('have.length', 8))
        .and('contain.html', 'post-icon')
        .and('have.class', 'btn btn-primary btn-icon')
        .invoke('text')
        .should('not.be.empty');
    });

    it('should correctly show app store links', () => {
      shouldBeVisible(cy.get('[slot="app"] h3'))
        .invoke('attr', 'id')
        .should('not.be.empty')
        .then(id => {
          cy.get('[slot="app"] ul').invoke('attr', 'aria-labelledby').should('eq', id);
        });

      shouldBeVisible(cy.get('[slot="app"] a').should('have.length', 2))
        .and('contain.html', 'img')
        .and('have.class', 'app-store-badge')
        .invoke('text')
        .should('not.be.empty');
    });

    it('should correctly show company links', () => {
      shouldBeVisible(cy.get('[slot="businesssectors"] h3'))
        .invoke('attr', 'id')
        .should('not.be.empty')
        .then(id => {
          cy.get('[slot="businesssectors"] ul').invoke('attr', 'aria-labelledby').should('eq', id);
        });
      shouldBeVisible(cy.get('[slot="businesssectors"] a').should('have.length', 2));
    });

    it('should correctly show compliance links', () => {
      cy.get('[slot="meta"] h3').should('not.exist');
      cy.get('[slot="meta"] ul').invoke('attr', 'aria-label').should('not.be.empty');
      shouldBeVisible(cy.get('[slot="meta"] a').should('have.length', 4));
    });

    it('should correctly show copyrights', () => {
      shouldBeVisible(cy.get('[slot="copyright"]'));
    });

    it('should not show cookie settings link when UC_UI is not defined', () => {
      cy.get('div[slot="meta"]').should('exist').get('.cookie-settings').should('not.exist');
    });

    it('should show cookie settings when UC_UI is defined', () => {
      cy.window().then(win => {
        win['UC_UI'] = { showSecondLayer: () => 'second layer mock' };
        cy.get('div[slot="meta"]').should('exist').get('.cookie-settings').should('exist');
      });
    });
  });

  describe('optional content', () => {
    let customConfig: LocalizedConfig;

    const slotsByConfigKey: { [key in keyof FooterConfig]?: string } = {
      socialLinks: 'socialmedia',
      appStoreLinks: 'app',
      companyLinks: 'businesssectors',
      complianceLinks: 'meta',
      copyright: 'copyright',
    };

    function removeKeyFromConfig(configKey: keyof FooterConfig) {
      customConfig = structuredClone(testConfiguration);
      if (customConfig.footer && configKey in customConfig.footer) {
        delete customConfig.footer[configKey];
      }
    }

    it(`should work properly when "sections" is not defined in the configuration`, () => {
      removeKeyFromConfig('sections');
      prepare(FOOTER, 'Default', { config: customConfig });

      cy.get(`[slot^=grid]`).should('not.exist');
    });

    (Object.entries(slotsByConfigKey) as [keyof FooterConfig, string][]).forEach(
      ([configKey, slot]) => {
        it(`should work properly when "${configKey}" is not defined in the configuration`, () => {
          removeKeyFromConfig(configKey);
          prepare(FOOTER, 'Default', { config: customConfig });

          cy.get(`[slot|="${slot}"]`).should('not.exist');
        });
      },
    );
  });
});
