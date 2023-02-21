import { installInterceptors } from '../support/prepare-story';

describe('footer', () => {
  beforeEach(() => {
    installInterceptors();
    cy.visit('/iframe.html?args=&id=components-internet-header-header--default');
    cy.get('swisspost-internet-header.hydrated').should('be.visible');
  });

  it.skip('default', () => {
    cy.scrollTo('bottom');
    cy.get('swisspost-internet-footer').should('be.visible');
    cy.percySnapshot('Footer');
  });
});
