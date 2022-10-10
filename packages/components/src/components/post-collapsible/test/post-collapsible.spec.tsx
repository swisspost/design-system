import { newSpecPage } from '@stencil/core/testing';
import { PostCollapsible } from '../post-collapsible';

describe('post-collapsible', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PostCollapsible],
      html: `<post-collapsible></post-collapsible>`,
    });
    expect(page.root).toEqualHtml(`
      <post-collapsible>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </post-collapsible>
    `);
  });
});
