import { prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';

describe('stickyness', () => {
  beforeEach(() => {
    prepare(HEADER, 'Default');
  });

  it('should not show header when scrolling when stickyness is none', () => {
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.changeArg('stickyness', 'none');
    cy.wait(10);
    cy.get('.header-story-wrapper').scrollTo('bottom');
    cy.get('swisspost-internet-header').should('not.be.inViewport');
  });

  it('should not show header when scrolling down with stickyness minimal, should show header without meta when scrolling up a little', () => {
    cy.changeArg('stickyness', 'minimal');
    cy.get('post-meta-navigation').should('be.inViewport');
    cy.get('.header-story-wrapper').scrollTo('bottom');
    cy.get('.fake-content:last-of-type').should('be.inViewport');
    cy.get('swisspost-internet-header').should('not.be.inViewport');
    cy.get('post-meta-navigation').should('not.be.inViewport');
    cy.get('.header-story-wrapper').scrollTo('center', { duration: 10 });
    cy.get('.header-story-wrapper').then($el => {
      const el = $el.get(0); //native DOM element
      if (el) {
        el.scrollTo(0, el.scrollTop - 20);
      }
    });
    cy.get('post-main-navigation').should('be.visible');
    cy.get('post-main-navigation').should('be.inViewport');
    cy.get('post-meta-navigation').should('not.be.inViewport');
    cy.get('.header-story-wrapper').scrollTo('top');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('be.inViewport');
  });

  it('should show main header when scrolling down', () => {
    cy.changeArg('stickyness', 'main');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('be.inViewport');
    cy.get('.header-story-wrapper').scrollTo('bottom');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('not.be.inViewport');
  });

  it('should show complete header when scrolling down', () => {
    cy.changeArg('stickyness', 'full');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('be.inViewport');
    cy.get('.header-story-wrapper').scrollTo('bottom');
    cy.get('swisspost-internet-header').should('be.inViewport');
    cy.get('post-meta-navigation').should('be.inViewport');
  });
});
