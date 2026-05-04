// AUTO-GENERATED COMPONENTS list — regenerate with: node scripts/sync-markup-components.mjs
import { COMPONENTS } from '../fixtures/markup-components';

function extractStoryMarkup(id: string, story: string, tag: string, options: object | undefined) {
  cy.visit(`/iframe.html?id=${id}--${story}`);
  cy.get('.story-markup').should('exist');
  cy.get('[data-hydrated]').should('have.length.at.least', 1);
  cy.get('.story-markup')
    .invoke('prop', 'innerHTML')
    .then(html => cy.writeMarkup(tag, html, options, story));
}

describe('Extract markup', () => {
  COMPONENTS.forEach(({ id, stories, tags }) => {
    const name = typeof tags[0] === 'string' ? tags[0] : tags[0].tag;

    stories.forEach(story => {
      tags.forEach(entry => {
        const tag = typeof entry === 'string' ? entry : entry.tag;
        const options = typeof entry === 'string' ? undefined : entry.options;

        it(`should extract markup for ${name} (${story})`, () => {
          extractStoryMarkup(id, story, tag, options);
        });
      });
    });
  });
});
