const DOCS_ID = '9f26d86e-7edb-5804-ac96-92g22f91c9d9--docs';
const STORY_ID = '9f26d86e-7edb-5804-ac96-92g22f91c9d9--default';

describe('Side Navigation docs', () => {
  const getStoryNav = () =>
    cy
      .get(`iframe[src*="id=${STORY_ID}"]`)
      .its('0.contentDocument.body')
      .find('post-side-navigation[data-hydrated]');

  const getControlRow = (name: string) => cy.contains('.docblock-argstable tbody tr', name);

  beforeEach(() => {
    cy.visit(`/iframe.html?id=${DOCS_ID}&viewMode=docs`);
    // Canvases stay hidden until the styles switcher of the manager sets their color scheme
    cy.get('.main-story .sbdocs-preview').invoke('attr', 'data-color-scheme', 'light');
    getStoryNav().should('have.attr', 'size', 'large');
  });

  it('should update the story rendered in an iframe when the controls change', () => {
    getStoryNav().find('post-icon[name="letter"]').should('not.exist');

    getControlRow('size').find('input[type="radio"][value="small"]').check({ force: true });
    getControlRow('Show icons').find('input[type="checkbox"]').check({ force: true });
    getControlRow('text-close').find('textarea').clear().type('Schliessen');

    getStoryNav().should('have.attr', 'size', 'small');
    getStoryNav().should('have.attr', 'text-close', 'Schliessen');
    getStoryNav().find('nav > ul > li post-icon[name="letter"]').should('have.length', 6);
    getStoryNav().find('ul ul post-icon[name="letter"]').should('not.exist');
  });

  it('should keep the current controls when the iframe reloads', () => {
    getControlRow('size').find('input[type="radio"][value="small"]').check({ force: true });
    getStoryNav().should('have.attr', 'size', 'small');

    cy.get(`iframe[src*="id=${STORY_ID}"]`)
      .its('0.contentWindow')
      .then((win: Window & { beforeReload?: boolean }) => {
        win.beforeReload = true;
        win.location.reload();
      });

    // Make sure the assertion below runs against the reloaded document
    cy.get(`iframe[src*="id=${STORY_ID}"]`)
      .its('0.contentWindow')
      .should('not.have.property', 'beforeReload');

    getStoryNav().should('have.attr', 'size', 'small');
  });
});
