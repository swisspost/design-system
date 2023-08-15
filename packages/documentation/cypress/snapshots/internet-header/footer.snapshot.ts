import { installInterceptors } from '@swisspost/internet-header/cypress/support/prepare-story';

describe('footer', () => {
  beforeEach(() => {
    installInterceptors();
    cy.visit('/iframe.html?id=internet-header-components-header--default');
    cy.get('swisspost-internet-header.hydrated').should('be.visible');
  });

  it.skip('default', () => {
    cy.scrollTo('bottom');
    cy.get('swisspost-internet-footer').should('be.visible');
    cy.percySnapshot('Footer');
  });
});
