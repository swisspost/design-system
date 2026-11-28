import { DESKTOP_BREAKPOINT, NON_DESKTOP_VIEWPORT_WIDTH } from '../../../support/breakpoints';

describe('Self-managed Header docs', () => {
  const DOCS_ID = '27a2e64d-55ba-492d-ab79-5f7c5e818498--docs';
  const STORY_ID = '27a2e64d-55ba-492d-ab79-5f7c5e818498--default';

  const getControlRow = (name: string) => cy.contains('.docblock-argstable tbody tr', name);

  const visitDocs = (viewportWidth: number) => {
    cy.viewport(viewportWidth, 900);
    cy.visit(`/iframe.html?id=${DOCS_ID}&viewMode=docs`);

    // Query aliases are re-run on every use, so they also resolve after the iframe reloads
    cy.get(`iframe[src*="id=${STORY_ID}"]`).its('0.contentWindow').as('storyWindow');
    cy.get(`iframe[src*="id=${STORY_ID}"]`)
      .its('0.contentDocument.body')
      .find('post-header[data-hydrated]')
      .as('storyHeader');
  };

  it('should show the non-desktop header when the preview is narrower than the desktop breakpoint', () => {
    visitDocs(NON_DESKTOP_VIEWPORT_WIDTH);

    cy.window().its('innerWidth').should('be.gte', DESKTOP_BREAKPOINT);
    cy.get('@storyWindow').its('innerWidth').should('be.lt', DESKTOP_BREAKPOINT);

    cy.get('@storyHeader').shadow().find('.burger-button').should('exist');
    cy.get('@storyHeader').shadow().find('.audience').should('not.exist');
  });

  it('should show the desktop header when the preview is wider than the desktop breakpoint', () => {
    visitDocs(1920);

    cy.get('@storyWindow').its('innerWidth').should('be.gte', DESKTOP_BREAKPOINT);

    cy.get('@storyHeader').shadow().find('.burger-button').should('not.exist');
    cy.get('@storyHeader').shadow().find('.audience').should('exist');
  });

  it('should update the story and the code snippet when the controls change', () => {
    visitDocs(NON_DESKTOP_VIEWPORT_WIDTH);

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
