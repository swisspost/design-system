import { newSpecPage } from '@stencil/core/testing';
import { PostButton } from '../button';

describe('p-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PostButton],
      html: `<post-button></post-button>`,
    });
    expect(page.root).toEqualHtml(`
      <post-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </post-button>
    `);
  });
});
