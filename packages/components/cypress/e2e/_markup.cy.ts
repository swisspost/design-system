// AUTO-GENERATED COMPONENTS list — regenerate with: node scripts/sync-markup-components.mjs
import { COMPONENTS } from '../fixtures/markup-components';

describe('Extract markup', () => {
  COMPONENTS.forEach(({ id, stories, tags }) => {
    const name = typeof tags[0] === 'string' ? tags[0] : tags[0].tag;

    stories.forEach(story => {
      it(`should extract markup for ${name} (${story})`, () => {
        cy.visit(`/iframe.html?id=${id}--${story}`);

        tags.forEach(entry => {
          const tag = typeof entry === 'string' ? entry : entry.tag;
          const options = typeof entry === 'string' ? undefined : entry.options;

          cy.get(tag)
            .invoke('prop', 'outerHTML')
            .then(html => cy.writeMarkup(tag, html, options, story));
        });
      });
    });
  });
});
