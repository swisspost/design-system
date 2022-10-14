import { newSpecPage } from '@stencil/core/testing';
import { PostButton } from '../button';

describe('post-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PostButton],
      html: `<post-button>Button</post-button>`,
    });

    expect(page.root).toEqualHtml(`
      <post-button>
        <mock:shadow-root>
          <button class="btn" type="button">
            <slot></slot>
          </button>
        </mock:shadow-root>
        Button
      </post-button>
    `);
  });

  it('renders as link', async () => {
    const page = await newSpecPage({
      components: [PostButton],
      html: `<post-button tag="a" href="#" target="_self">Button</post-button>`,
    });

    expect(page.root).toEqualHtml(`
      <post-button href="#" tag="a" target="_self">
        <mock:shadow-root>
          <a class="btn" href="#" target="_self">
            <slot></slot>
          </a>
        </mock:shadow-root>
        Button
      </post-button>
    `);
  });

  it('renders as input', async () => {
    const page = await newSpecPage({
      components: [PostButton],
      html: `<post-button tag="input">Button</post-button>`,
    });

    expect(page.root).toEqualHtml(`
      <post-button tag="input">
        <mock:shadow-root>
          <input class="btn" type="button" value="Button">
        </mock:shadow-root>
        Button
      </post-button>
    `);
  });
});
