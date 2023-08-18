import { installInterceptors } from '@swisspost/internet-header/cypress/support/prepare-story';

describe('breadcrumbs', () => {
  beforeEach(() => {
    installInterceptors();
    cy.visit('/iframe.html?id=internet-header-components-header--default');
    cy.get('swisspost-internet-header.hydrated').should('be.visible');
  });

  it.skip('default', () => {
    cy.viewport(400, 800);
    cy.get('.middle-dropdown-button').should('be.visible').trigger('click');
    cy.get('.middle-dropdown').should('be.visible');
    cy.percySnapshot('Breadcrumb dropdown', { widths: [400] });
  });

  it.skip('overlay', () => {
    cy.viewport(1440, 800);
    cy.get('.breadcrumb-buttons .btn').first().trigger('click');
    cy.get('.overlay-container.loaded').should('be.visible');
    cy.percySnapshot('Breadcrumb overlay');
  });
});
