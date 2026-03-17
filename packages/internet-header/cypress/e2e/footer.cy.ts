import { prepare } from '../support/prepare-story';
import { FOOTER } from './shared/variables';

describe('footer', () => {
  beforeEach(() => {
    prepare(FOOTER, 'Default');
  });

  it('should correctly show footer sections', () => {
    const linkCounts = [6, 8, 8, 5];
    cy.get('ul[slot|="grid"]')
      .should('have.length', 4)
      .should('be.visible')
      .each(($el, i) => {
        cy.wrap($el)
          .invoke('attr', 'aria-labelledby')
          .should('not.be.empty')
          .then(id => {
            cy.get(`span[slot="grid-${i + 1}-title"]`)
              .invoke('attr', 'id')
              .should('eq', id);
          });

        cy.wrap($el).find('a').should('have.length', linkCounts[i]).and('be.visible');
      });
  });

  it('should correctly show social links', () => {
    cy.get('[slot="socialmedia"] h3')
      .should('be.visible')
      .invoke('attr', 'id')
      .should('not.be.empty')
      .then(id => {
        cy.get('[slot="socialmedia"] ul').invoke('attr', 'aria-labelledby').should('eq', id);
      });

    cy.get('[slot="socialmedia"] a')
      .should('have.length', 8)
      .and('be.visible')
      .and('contain.html', 'post-icon')
      .and('have.class', 'btn btn-primary btn-icon')
      .invoke('text')
      .should('not.be.empty');
  });

  it('should correctly show app store links', () => {
    cy.get('[slot="app"] h3')
      .should('be.visible')
      .invoke('attr', 'id')
      .should('not.be.empty')
      .then(id => {
        cy.get('[slot="app"] ul').invoke('attr', 'aria-labelledby').should('eq', id);
      });

    cy.get('[slot="app"] a')
      .should('have.length', 2)
      .and('be.visible')
      .and('contain.html', 'img')
      .and('have.class', 'app-store-badge')
      .invoke('text')
      .should('not.be.empty');
  });

  it('should correctly show company links', () => {
    cy.get('[slot="businesssectors"] h3')
      .should('be.visible')
      .invoke('attr', 'id')
      .should('not.be.empty')
      .then(id => {
        cy.get('[slot="businesssectors"] ul').invoke('attr', 'aria-labelledby').should('eq', id);
      });
    cy.get('[slot="businesssectors"] a').should('have.length', 2).and('be.visible');
  });

  it('should correctly show compliance links', () => {
    cy.get('[slot="meta"] h3').should('not.exist');
    cy.get('[slot="meta"] ul').invoke('attr', 'aria-label').should('not.be.empty');
    cy.get('[slot="meta"] a').should('have.length', 4).and('be.visible');
  });

  it('should correctly show copyrights', () => {
    cy.get('[slot="copyright"]').should('be.visible');
  });

  describe('external functions test', () => {
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
});
