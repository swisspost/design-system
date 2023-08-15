import { installInterceptors } from '@swisspost/internet-header/cypress/support/prepare-story';

describe('header', () => {
  beforeEach(() => {
    installInterceptors();
    cy.visit('/iframe.html?id=internet-header-components-header--default');
    cy.get('swisspost-internet-header.hydrated').should('be.visible');
  });

  it('default', () => {
    cy.percySnapshot('Header', { widths: [320, 600, 1440] });
  });

  it.skip('search', () => {
    cy.get('.search-button').trigger('click');
    cy.get('.suggestions').should('be.visible').children().should('have.length', 7);
    cy.percySnapshot('Search');
  });

  it.skip('language switch', () => {
    cy.viewport(1600, 800);
    cy.get('.language-switch > button').trigger('click');
    cy.get('.language-switch-dropdown.open > ul')
      .should('be.visible')
      .children()
      .should('have.length', 3);
    cy.percySnapshot('Language Switch', { widths: [1600] });
  });

  it.skip('main navigation', () => {
    cy.viewport(1440, 800);
    cy.get('.main-container').children().should('have.length', 5);
    cy.get('.main-container .main-link').first().trigger('mouseenter');

    cy.get('.flyout-row').first().should('be.visible').children().should('have.length', 3);
    cy.percySnapshot('Main navigation desktop', { widths: [1440] });

    cy.viewport(400, 800);
    cy.get('.menu-button.nav-link').trigger('click');
    cy.get('.main-navigation.open').should('be.visible');
    cy.percySnapshot('Main navigation mobile', { widths: [400] });

    cy.get('.main-navigation .main-link').first().trigger('click');
    cy.get('.flyout-row').first().should('be.visible').children().should('have.length', 3);
    cy.percySnapshot('Main navigation open menu', { widths: [400] });
  });

  it.skip('breadcrumbs', () => {
    cy.viewport(400, 800);
    cy.get('.middle-dropdown-button').should('be.visible').trigger('click');
    cy.get('.middle-dropdown').should('be.visible');
    cy.percySnapshot('Breadcrumb dropdown', { widths: [400] });
  });

  it.skip('footer', () => {
    cy.scrollTo('bottom');
    cy.get('swisspost-internet-footer').should('be.visible');
    cy.percySnapshot('Footer');
  });
});
