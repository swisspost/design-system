import { newSpecPage } from '@stencil/core/testing';
import { PostTest } from '../post-test';

describe('post-test', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PostTest],
      html: `<post-test></post-test>`,
    });
    expect(page.root).toEqualHtml(`
      <post-test>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </post-test>
    `);
  });
});
