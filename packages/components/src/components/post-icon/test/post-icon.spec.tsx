import { newSpecPage } from '@stencil/core/testing';
import { PostIcon } from '../post-icon';

describe('post-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PostIcon],
      html: `<post-icon></post-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <post-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </post-icon>
    `);
  });
});
