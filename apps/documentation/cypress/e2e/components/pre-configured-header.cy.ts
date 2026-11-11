describe('Pre-configured Header docs', () => {
  // Declared inside `describe`: spec files without imports share their top-level scope
  const DOCS_ID = 'ebb11274-091b-4cb7-9a3f-3e0451c9a865--docs';
  const STORY_ID = 'ebb11274-091b-4cb7-9a3f-3e0451c9a865--default';
  const DESKTOP_MIN_WIDTH = 1024;
  // The page is wider than the breakpoint while the preview inside it is narrower, with a margin on both sides
  const MOBILE_PREVIEW_VIEWPORT = 1060;

  const getControlRow = (name: string) => cy.contains('.docblock-argstable tbody tr', name);

  const visitDocs = (viewportWidth: number) => {
    cy.viewport(viewportWidth, 900);
    cy.visit(`/iframe.html?id=${DOCS_ID}&viewMode=docs`);

    // Canvases stay hidden until the styles switcher of the manager sets their color scheme
    cy.get('.sbdocs-preview').first().invoke('attr', 'data-color-scheme', 'light');

    // Query aliases are re-run on every use, so they also resolve after the iframe reloads
    cy.get(`iframe[src*="id=${STORY_ID}"]`).its('0.contentWindow').as('storyWindow');
    cy.get(`iframe[src*="id=${STORY_ID}"]`)
      .its('0.contentDocument.body')
      .find('swisspost-internet-header')
      .as('storyInternetHeader');
    cy.get('@storyInternetHeader').find('post-header[data-hydrated]').as('storyHeader');
  };

  it('should show the mobile header when the preview is narrower than the desktop breakpoint', () => {
    visitDocs(MOBILE_PREVIEW_VIEWPORT);

    cy.window().its('innerWidth').should('be.gte', DESKTOP_MIN_WIDTH);
    cy.get('@storyWindow').its('innerWidth').should('be.lt', DESKTOP_MIN_WIDTH);

    cy.get('@storyHeader').shadow().find('.burger-button').should('exist');
    cy.get('@storyHeader').shadow().find('.audience').should('not.exist');
  });

  it('should show the desktop header when the preview is wider than the desktop breakpoint', () => {
    visitDocs(1920);

    cy.get('@storyWindow').its('innerWidth').should('be.gte', DESKTOP_MIN_WIDTH);

    cy.get('@storyHeader').shadow().find('.burger-button').should('not.exist');
    cy.get('@storyHeader').shadow().find('.audience').should('exist');
  });

  it('should update the story and the code snippet when the controls change', () => {
    visitDocs(MOBILE_PREVIEW_VIEWPORT);

    cy.get('.sbdocs-preview').first().find('pre').as('source');
    cy.get('@source').should('contain.text', 'language="en"');

    getControlRow('language').find('input[type="radio"][value="de"]').check({ force: true });

    cy.get('@storyInternetHeader').should('have.attr', 'language', 'de');
    cy.get('@source').should('contain.text', 'language="de"');
  });
});
