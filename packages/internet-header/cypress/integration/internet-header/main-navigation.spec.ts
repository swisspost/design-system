import testConfiguration from '../../../src/assets/config/test-configuration.json';
import mockAuth from '../../fixtures/auth.json';
import { prepare } from './prepare-story';

describe('main-navigation', () => {
  beforeEach(() => {
    cy.intercept('**/v1/session/subscribe', mockAuth).as('auth');
  });

  it('should not have any highlight when active route is false', async () => {
    prepare();
    cy.changeArg('active-route', false);
    cy.get('swisspost-internet-header').shadow().find('.flyout-link, .main-link').should('exist');
    cy.get('swisspost-internet-header')
      .shadow()
      .find('.flyout-link.active, .main-link.active')
      .should('not.exist');
  });

  it('should not have an active element when active route is auto (test-config does not provide isActive)', () => {
    prepare();
    cy.changeArg('active-route', 'auto');
    cy.get('swisspost-internet-header').shadow().find('.flyout-link, .main-link').should('exist');
    cy.get('swisspost-internet-header')
      .shadow()
      .find('.flyout-link.active, .main-link.active')
      .should('not.exist');
  });

  it('should have an active route when config defines an active route', () => {
    const activeConfig = JSON.parse(JSON.stringify(testConfiguration));
    activeConfig.de.header.navMain[0].isActive = true;
    prepare('Header', 'Default', activeConfig);
    cy.intercept('/api/headerjs/Json?serviceid=*', activeConfig).as('getActiveConfig');
    cy.get('swisspost-internet-header')
      .shadow()
      .find('.flyout-link.active, .main-link.active')
      .should('exist');
  });

  it('Changes active link based on active-route prop', () => {
    prepare();
    cy.changeArg('active-route', 'https://post.ch/de/briefe-versenden/verfolgen');
    cy.get('swisspost-internet-header')
      .shadow()
      .find('.flyout-link.active')
      .should('exist')
      .should('have.text', 'Verfolgen');
  });

  it('Changes active link also in custom config nav links', () => {
    prepare('Header', 'Custom Navigation');
    cy.changeArg('active-route', 'https://maps.google.com');
    cy.get('swisspost-internet-header')
      .shadow()
      .find('.flyout-link.active')
      .should('exist')
      .should('have.text', 'Google Maps');
    cy.get('swisspost-internet-header').shadow().find('.main-link.active').should('have.length', 1);
  });

  it('Marks active when using custom config and auto highlighting', () => {
    prepare('Header', 'Default');
    cy.url().then(url => {
      const expectedText = 'Custom';
      cy.changeArg('active-route', 'auto');
      cy.changeArg('custom-config', {
        de: {
          header: {
            navMain: [
              {
                title: 'Custom Link',
                text: 'Custom Link',
                flyout: [
                  {
                    title: 'Custom Nav',
                    linkList: [{ url, title: expectedText }],
                  },
                  {
                    title: 'Deeper nav',
                    linkList: [{ url: url + '/some/levels/deeper', title: 'Deeper nav' }],
                  },
                ],
              },
            ],
          },
        },
      });

      cy.get('swisspost-internet-header')
        .shadow()
        .find('.flyout-link.active')
        .should('exist')
        .should('have.text', expectedText);
    });
  });

  it('Marks active when using custom config and auto highlighting', () => {
    prepare('Header', 'Default');
    cy.url().then(url => {
      const expectedText = 'Custom';
      cy.changeArg('active-route', 'auto');
      cy.changeArg('custom-config', {
        de: {
          header: {
            navMain: [
              {
                title: 'Custom Link',
                text: 'Custom Link',
                flyout: [
                  {
                    title: 'Custom Nav',
                    linkList: [{ url, title: expectedText }],
                  },
                ],
              },
            ],
          },
        },
      });

      cy.get('swisspost-internet-header')
        .shadow()
        .find('.flyout-link.active')
        .should('exist')
        .should('have.text', expectedText);
    });
  });
});
