import mockCoveoSuggestions from '../fixtures/internet-header/coveo-suggestions.json';
import mockStaoCache from '../fixtures/internet-header/places-suggestions.json';
import mockStaoCacheTypes from '../fixtures/internet-header/staocache-types.json';
import { copyConfig, prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';

describe('search', () => {
  const searchButton = '#post-internet-header-search-button[aria-expanded=false]';
  const closeButton = '#post-internet-header-search-button[aria-expanded=true]';

  beforeEach(() => {
    cy.intercept('/rest/search/v2/querySuggest?**', mockCoveoSuggestions).as('coveoSuggestions');
    cy.intercept(
      '**/de/pages/suche',
      '<!DOCTYPE html><html><body><h1>Search mock</h1></body></html>',
    );
    cy.intercept('**/StandortSuche/StaoCacheService/Geocode**', mockStaoCache).as('StaoCache');
    cy.intercept('**/StandortSuche/StaoCacheService/Types**', mockStaoCacheTypes).as(
      'StaoCacheTypes',
    );

    prepare(HEADER, 'Default');
    cy.changeArg('language', 'de');
  });

  describe('config', () => {
    describe('default', () => {
      it('Search button should not be displayed if the config does not provide a search config', () => {
        cy.changeArg('search', false);
        cy.get('swisspost-internet-header').should('exist');
        cy.get('post-search').should('not.exist');
      });
    });
  });

  describe('args', () => {
    describe('search: true', () => {
      it(`adds search control`, () => {
        cy.get('post-search').should('exist').and('be.visible');
      });
    });

    describe('search: false', () => {
      it(`removes search control`, () => {
        cy.changeArg('search', false);
        cy.get('post-search').should('not.exist');
      });
    });

    describe('Search button should be hidden if header.search = false is set during runtime', () => {
      it(`change during runtime`, () => {
        cy.changeArg('search', false);
        cy.get('post-search').should('not.exist');
        cy.changeArg('search', true);
        cy.get('post-search').should('exist').and('be.visible');
      });
    });
  });

  describe('open & close', () => {
    describe('open search', () => {
      it('search should open on search button click', () => {
        cy.changeArg('search', true);
        cy.get(searchButton).click({ force: true });
        cy.get('.flyout').should('exist').should('have.class', 'open');
      });

      it('Coveo suggestions should be loaded when search is opened', () => {
        cy.changeArg('search', true);
        cy.get(searchButton).click();
        cy.get('#searchBox').type('s', { force: true });
        cy.get('.suggestions').should('exist');
        cy.get('.suggestions li use[href="#pi-search"]').should('have.length', 3);
      });

      it('Coveo suggestions should be turned off with isCustomSuggestionHidden', () => {
        const config = copyConfig();
        config.de!.header.search.isCustomSuggestionHidden = true;
        prepare(HEADER, 'Default', { config });
        cy.changeArg('language', 'de');
        cy.get(searchButton).click();
        cy.get('#searchBox').type('s', { force: true });
        cy.get('.suggestions').should('exist');
        cy.get('.suggestions li use[href="#pi-search"]').should('have.length', 0);
      });
    });

    describe('close search', () => {
      it('Search should close on esc key click', () => {
        cy.changeArg('search', true);
        cy.get(searchButton).click();
        cy.get('#searchBox')
          .click({ force: true })
          .clear({ force: true })
          .type('{esc}', { force: true });
        cy.get('.flyout').should('not.have.class', 'open');
      });

      it('Search should close on search button click', () => {
        cy.changeArg('search', true);
        cy.get(searchButton).click({ force: true });
        cy.get('.flyout').should('exist');
        cy.get(closeButton).click({ force: true });
        cy.get('.flyout').should('not.have.class', 'open');
      });
    });
  });

  describe('perform searches', () => {
    beforeEach(() => {
      cy.intercept(
        '**/de/kundencenter/onlinedienste/vgk/paketetiketten-inland/info**',
        '<html><body><h1>Paketetiketten mock</h1></body></html>',
      );
    });
    it('Search should redirect to search page on enter if search input has a value', () => {
      cy.changeArg('search', true);
      cy.get(searchButton).click({ force: true });
      // workaround type error disabled with this https://github.com/cypress-io/cypress/issues/5827
      cy.get('#searchBox')
        .click({ force: true })
        .clear({ force: true })
        .type('{enter}', { force: true });
      cy.location('pathname').should('eq', '/de/pages/suche');
    });

    it('With suggestions and focus on the search input, pressing arrow down should focus the first suggestion', () => {
      let value: string;
      cy.changeArg('search', true);
      cy.get(searchButton).click();
      cy.get('#searchBox').click();
      cy.get('#searchBox').type('{downArrow}', { force: true });
      cy.get('.suggestions li a')
        .first()
        .then($firstSuggestion => {
          value = $firstSuggestion.text().trim();
          cy.get('#searchBox').should('have.value', value);
        });
    });

    it('Should render geolocation results', () => {
      cy.changeArg('search', true);
      cy.get(searchButton).click();
      cy.get('#searchBox').click();
      cy.get('#searchBox').type('burgdorf', { force: true });
      cy.wait(100);
      cy.get('.suggestions').children().should('have.length', 7);
    });

    it('redirects to the correct search page', () => {
      cy.changeArg('search', true);
      cy.get(searchButton).click();
      cy.get('#searchBox').click().type('{downArrow}', { force: true });

      cy.get('.search-recommendation.selected').should(
        'have.attr',
        'href',
        'https://post.ch/de/kundencenter/onlinedienste/vgk/paketetiketten-inland/info',
      );
    });
  });
});
