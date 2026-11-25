import { renderToString } from '@swisspost/design-system-components/hydrate';
import { describe, expect, it } from 'vitest';

describe('findable content SSR', () => {
  it('serializes collapsed findable content as until-found before browser hydration', async () => {
    const result = await renderToString(
      '<post-collapsible collapsed findable><p id="target">Content</p></post-collapsible>',
      { serializeShadowRoot: 'declarative-shadow-dom' },
    );

    expect(result.diagnostics.filter(diagnostic => diagnostic.level === 'error')).toEqual([]);
    expect(result.html).toContain('<template shadowrootmode="open">');
    expect(result.html).toMatch(/<div\b[^>]* hidden="until-found"/);
  });

  it('serializes collapsed accordion item content as until-found when the accordion is findable', async () => {
    const result = await renderToString(
      '<post-accordion findable><post-accordion-item collapsed><span slot="header">Heading</span><p>Content</p></post-accordion-item></post-accordion>',
      { serializeShadowRoot: 'declarative-shadow-dom' },
    );

    expect(result.html).toMatch(/<div\b[^>]* hidden="until-found"/);
  });
});
