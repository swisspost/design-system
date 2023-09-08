import { prepare } from '../support/prepare-story';

describe('stickyness', () => {
  beforeEach(() => {
    prepare('Internet Header/Header', 'Default');
  });

  it('should not show header when scrolling when stickyness is none', () => {
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.changeArg('stickyness', 'none');
    cy.wait(10);
    cy.scrollTo('bottom');
    cy.get('swisspost-internet-header').should('not.be.inViewport');
  });

  it('should not show header when scrolling down with stickyness minimal, should show header without meta when scrolling up a little', () => {
    cy.changeArg('stickyness', 'minimal');
    cy.get('post-meta-navigation').should('be.inViewport');
    cy.scrollTo('bottom');
    cy.get('.fake-content:last-of-type').should('be.inViewport');
    cy.get('swisspost-internet-header').should('not.be.inViewport');
    cy.get('post-meta-navigation').should('not.be.inViewport');
    cy.scrollTo('center');
    cy.scrollTo(0, -20);
    cy.get('post-main-navigation').should('be.inViewport');
    cy.get('post-meta-navigation').should('not.be.inViewport');
    cy.scrollTo('top');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('be.inViewport');
  });

  it('should show main header when scrolling down', () => {
    cy.changeArg('stickyness', 'main');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('be.inViewport');
    cy.scrollTo('bottom');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('not.be.inViewport');
  });

  it('should show complete header when scrolling down', () => {
    cy.changeArg('stickyness', 'full');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('be.inViewport');
    cy.scrollTo('bottom');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('be.inViewport');
  });
});
