describe('Self-managed Header docs', () => {
  // Declared inside `describe`: spec files without imports share their top-level scope
  const DOCS_ID = '27a2e64d-55ba-492d-ab79-5f7c5e818498--docs';
  const STORY_ID = '27a2e64d-55ba-492d-ab79-5f7c5e818498--default';
  const DESKTOP_MIN_WIDTH = 1024;
  // The page is wider than the breakpoint while the preview inside it is narrower, with a margin on both sides
  const MOBILE_PREVIEW_VIEWPORT = 1060;

  const getControlRow = (name: string) => cy.contains('.docblock-argstable tbody tr', name);

  const visitDocs = (viewportWidth: number) => {
    cy.viewport(viewportWidth, 900);
    cy.visit(`/iframe.html?id=${DOCS_ID}&viewMode=docs`);

    // Canvases stay hidden until the styles switcher of the manager sets their color scheme
    cy.get('.main-story .sbdocs-preview').invoke('attr', 'data-color-scheme', 'light');

    // Query aliases are re-run on every use, so they also resolve after the iframe reloads
    cy.get(`iframe[src*="id=${STORY_ID}"]`).its('0.contentWindow').as('storyWindow');
    cy.get(`iframe[src*="id=${STORY_ID}"]`)
      .its('0.contentDocument.body')
      .find('post-header[data-hydrated]')
      .as('storyHeader');
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

    cy.get('.main-story pre').as('source');
    cy.get('@source').should('contain.text', '<post-header text-menu="Menu">');

    getControlRow('textMenu').find('textarea').clear().type('Menü');
    getControlRow('Application title').find('textarea').type('[Application Title]');

    cy.get('@storyHeader').should('have.attr', 'text-menu', 'Menü');
    cy.get('@storyHeader').shadow().find('.burger-button').should('contain.text', 'Menü');
    cy.get('@storyHeader').find('[slot="title"]').should('have.text', '[Application Title]');

    cy.get('@source').should('contain.text', '<post-header text-menu="Menü">');
    cy.get('@source').should('contain.text', '<p slot="title">[Application Title]</p>');
  });
});
