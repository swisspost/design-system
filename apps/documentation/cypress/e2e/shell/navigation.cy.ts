import {
  BUTTON_DOCS_ID,
  BUTTON_STORY_ID,
  expectSameWindow,
  getPreviewBody,
  markWindow,
  openSection,
  stubAnalytics,
  waitForPreview,
} from './preview';

describe('shell navigation', () => {
  beforeEach(() => {
    stubAnalytics();
    cy.clearLocalStorage();
  });

  it('shows the introduction on the home URL', () => {
    cy.visit('/');
    cy.title().should('contain', 'Introduction');
    cy.get('docs-sidebar [aria-current="page"]').should('contain.text', 'Introduction');
  });

  it('starts with the sidebar sections collapsed, except the one of the current page', () => {
    cy.visit('/');
    cy.get('docs-sidebar a[href="/components/button"]').should('not.be.visible');

    cy.visit('/components/button');
    cy.get('docs-sidebar a[href="/components/button"]').should('be.visible');
    cy.get('docs-sidebar a[href="/foundations/icons"]').should('not.be.visible');
  });

  it('opens sidebar links without reloading the shell', () => {
    cy.visit('/');
    markWindow();
    openSection('sidebar', 'components');
    cy.get('docs-sidebar a[href="/components/button"]').click();
    cy.location('pathname').should('equal', '/components/button');
    cy.get('docs-sidebar [aria-current="page"]').should('contain.text', 'Button');
    getPreviewBody('Button');
    expectSameWindow();

    cy.go('back');
    cy.location('pathname').should('equal', '/');
    expectSameWindow();
  });

  it('rewrites old manager URLs to readable ones', () => {
    cy.visit(`/?path=/docs/${BUTTON_DOCS_ID}`);
    cy.location('pathname').should('equal', '/components/button');
    cy.location('search').should('equal', '');
    getPreviewBody('Button');
  });

  it('rewrites the permanent /docs/<id> alias', () => {
    cy.visit(`/docs/${BUTTON_DOCS_ID}#variants`);
    cy.location('pathname').should('equal', '/components/button');
    cy.location('hash').should('equal', '#variants');
  });

  it('opens old story URLs in the bare preview', () => {
    cy.visit(`/?path=/story/${BUTTON_STORY_ID}&full=true&args=text:Hello`);
    cy.location('pathname').should('equal', '/iframe.html');
    // Storybook rewrites the URL with `:` encoded
    cy.location('search')
      .then(decodeURIComponent)
      .should('contain', `id=${BUTTON_STORY_ID}`)
      .and('contain', 'args=text:Hello');
    cy.get('#storybook-root button').should('contain.text', 'Hello');
  });

  it('shows a message for unknown pages', () => {
    cy.visit('/components/does-not-exist');
    cy.get('.shell-message h1').should('have.text', 'Page not found');
  });

  it('switches dev mode with the old query param and remembers it', () => {
    cy.visit('/?devModeEnabled=true');
    cy.location('search').should('equal', '');
    cy.window().its('localStorage.devModeEnabled').should('equal', 'true');
    cy.get('docs-sidebar').should('contain.text', 'Accessibility Practices');
    waitForPreview();

    cy.visit('/');
    cy.get('docs-sidebar').should('contain.text', 'Accessibility Practices');
    waitForPreview();

    cy.visit('/?devModeEnabled=false');
    cy.get('docs-sidebar .nav-tree').should('not.contain.text', 'Accessibility Practices');
  });

  it('pushes the page context and page changes to the data layer', () => {
    cy.visit('/');
    openSection('sidebar', 'components');
    cy.get('docs-sidebar a[href="/components/button"]').click();
    cy.window()
      .its('dataLayer')
      .should((dataLayer: Record<string, string>[]) => {
        const events = dataLayer.filter(entry => entry.event?.startsWith('page_'));
        expect(events.map(entry => entry.event)).to.deep.equal(['page_context', 'page_change']);
        expect(events[1].page_name_language_neutral).to.contain('Button');
      });
  });

  describe('on small screens', () => {
    beforeEach(() => {
      cy.viewport(400, 800);
    });

    it('opens pages from the navigation panel', () => {
      cy.visit('/');
      cy.get('.nav-mobile-bar').click();
      openSection('sheet', 'components');
      cy.get('.nav-panel a[href="/components/button"]').click();
      cy.location('pathname').should('equal', '/components/button');
      cy.get('.nav-mobile-location').should('contain.text', 'Components/Button');
      cy.get('.nav-panel').should('not.be.visible');
    });
  });
});
