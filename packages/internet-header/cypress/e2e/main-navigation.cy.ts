import testConfiguration from '../fixtures/internet-header/test-configuration.json';
import { prepare } from '../support/prepare-story';
import { HEADER } from './shared/variables';

describe('main-navigation', () => {
  beforeEach(() => {
    prepare(HEADER, 'Default');
    cy.changeArg('language', 'de');
  });

  it('should not have any highlight when active route is false', async () => {
    cy.changeArg('active-route', false);
    cy.get('swisspost-internet-header').shadow().find('.flyout-link, .main-link').should('exist');
    cy.get('swisspost-internet-header')
      .shadow()
      .find('.flyout-link.active, .main-link.active')
      .should('not.exist');
  });

  it('should not have an active element when active route is auto (test-config does not provide isActive)', () => {
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
    prepare(HEADER, 'Default', { config: activeConfig });
    cy.changeArg('language', 'de');
    cy.get('swisspost-internet-header')
      .shadow()
      .find('.flyout-link.active, .main-link.active')
      .should('exist');
  });

  it('Changes active link based on active-route prop', () => {
    cy.changeArg('active-route', 'https://post.ch/de/briefe-versenden/verfolgen');
    cy.get('swisspost-internet-header')
      .shadow()
      .find('.flyout-link.active')
      .should('exist')
      .should($element => {
        expect($element.clone().children().remove().end().text().trim()).to.eq('Verfolgen');
      });
  });

  it('Changes active link also in custom config nav links', () => {
    prepare(HEADER, 'CustomConfig');
    cy.changeArg('language', 'en');
    cy.changeArg('active-route', 'https://maps.google.com');
    cy.get('swisspost-internet-header')
      .shadow()
      .find('.flyout-link.active')
      .should('exist')
      .should($element => {
        expect($element.clone().children().remove().end().text().trim()).to.eq('Google Maps');
      });
    cy.get('swisspost-internet-header').shadow().find('.main-link.active').should('have.length', 1);
  });

  it('Marks active when using custom config and auto highlighting', () => {
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
        .should($element => {
          expect($element.clone().children().remove().end().text().trim()).to.eq(expectedText);
        });
    });
  });

  it('Marks active when using custom config and auto highlighting', () => {
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
        .should($element => {
          expect($element.clone().children().remove().end().text().trim()).to.eq(expectedText);
        });
    });
  });
});
