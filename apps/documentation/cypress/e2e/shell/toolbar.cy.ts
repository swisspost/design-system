import { clickLink, getPreviewBody, stubAnalytics, waitForPreview } from './preview';

describe('shell toolbar', () => {
  beforeEach(() => {
    stubAnalytics();
    cy.clearLocalStorage();
  });

  it('applies a color scheme to the URL, the storage and the preview', () => {
    cy.visit('/components/button');
    getPreviewBody('Button');

    cy.get('docs-topbar .toolbar-trigger').contains('Color Scheme').click();
    cy.get('docs-topbar post-menu-item').contains('Dark').click();

    cy.location('search').should('equal', '?scheme=dark');
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'spds-docs:globals')
      .should('contain', '"scheme":"dark"');
    getPreviewBody('Button')
      .find('.sbdocs-preview')
      .first()
      .should('have.attr', 'data-color-scheme', 'dark');
  });

  it('reads the globals from the URL, including the old globals param', () => {
    cy.visit('/components/button?globals=theme:cargo;palette:accent');
    cy.location('search').should('equal', '?theme=cargo&palette=accent');
    getPreviewBody('Button').find('.docs-story').first().should('have.class', 'palette-accent');
    cy.get<HTMLIFrameElement>('#storybook-preview-iframe')
      .its('0.contentDocument')
      .find('#post-styles')
      .should('have.attr', 'href', '/styles/cargo-default.css');
  });

  it('keeps the globals when another page is opened', () => {
    cy.visit('/components/button?scheme=dark');
    cy.get('docs-sidebar a[href="/components/badge"]').click();
    cy.location('pathname').should('equal', '/components/badge');
    cy.location('search').should('equal', '?scheme=dark');
  });

  it('keeps a toolbar choice when going back', () => {
    cy.visit('/components/button?scheme=dark');
    waitForPreview();
    clickLink('/components/badge');
    waitForPreview();

    cy.get('docs-topbar .toolbar-trigger').contains('Color Scheme').click();
    cy.get('docs-topbar post-menu-item').contains('Light').click();
    cy.location('search').should('equal', '');

    cy.go('back');
    cy.location('pathname').should('equal', '/components/button');
    cy.location('search').should('equal', '');
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'spds-docs:globals')
      .should('contain', '"scheme":"light"');
    getPreviewBody('Button')
      .find('.sbdocs-preview')
      .first()
      .should('have.attr', 'data-color-scheme', 'light');
  });
});
