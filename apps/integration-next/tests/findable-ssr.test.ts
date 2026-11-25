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
});
