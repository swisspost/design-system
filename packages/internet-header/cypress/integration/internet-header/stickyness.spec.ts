import mockAuth from '../../fixtures/auth.json';
import { prepare } from './prepare-story';

describe('stickyness', () => {
  before(() => {
    cy.viewport('macbook-11');
  });

  beforeEach(() => {
    cy.intercept('**/v1/session/subscribe', mockAuth).as('auth');
  });

  it('should not show header when scrolling when stickyness is none', () => {
    prepare();

    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.changeArg('stickyness', 'none');
    cy.wait(10);
    cy.scrollTo('bottom');
    cy.get('swisspost-internet-header').should('not.be.inViewport');
  });

  it('should not show header when scrolling down with stickyness minimal, should show header without meta when scrolling up a little', () => {
    prepare();

    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.changeArg('stickyness', 'minimal');
    cy.scrollTo('bottom');
    cy.get('swisspost-internet-header').should('not.be.inViewport');
    cy.wait(10);
    cy.scrollTo('center');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('not.be.inViewport');
    cy.scrollTo('top');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('be.inViewport');
  });

  it('should show main header when scrolling down', () => {
    prepare();

    cy.changeArg('stickyness', 'main');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('be.inViewport');
    cy.scrollTo('bottom');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('not.be.inViewport');
  });

  it('should show complete header when scrolling down', () => {
    prepare();

    cy.changeArg('stickyness', 'full');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('be.inViewport');
    cy.scrollTo('bottom');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('be.inViewport');
  });
});
