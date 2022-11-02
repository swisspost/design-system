import { newSpecPage } from '@stencil/core/testing';
import { PostCollapsible } from '../post-collapsible';

describe('post-collapsible', () => {
  it('should render without header', async () => {
    const { root } = await newSpecPage({
      components: [PostCollapsible],
      html: `<post-collapsible id="noHeaderCollapsible">Test content</post-collapsible>`,
    });

    expect(root).toEqualHtml(`
        <post-collapsible id="noHeaderCollapsible">
          <mock:shadow-root>
            <div class="collapse show" id="noHeaderCollapsible--collapse">
              <slot></slot>
            </div>
          </mock:shadow-root>
          Test content
        </post-collapsible>
      `);
  });

  it('should render with a header', async () => {
    const { root } = await newSpecPage({
      components: [PostCollapsible],
      html: `<post-collapsible>
                 <h2 slot="header">Test header</h2>
                 <p slot="body">Test body</p>
               </post-collapsible>`,
    });

    expect(root).toEqualHtml(`
        <post-collapsible>
          <mock:shadow-root>
            <div class="accordion-item">
              <h2 class="accordion-header" id="post-collapsible-0--header">
                <button aria-controls="post-collapsible-0--collapse" aria-expanded="true" class="accordion-button" type="button">
                  <div slot="header">
                    Test header
                  </div>
                </button>
              </h2>
              <div aria-labelledby="post-collapsible-0--header" class="accordion-collapse collapse show" id="post-collapsible-0--collapse">
                <div class="accordion-body">
                  <slot name="body"></slot>
                </div>
              </div>
            </div>
          </mock:shadow-root>
          <h2 slot="header">
            Test header
          </h2>
          <p slot="body">
            Test body
          </p>
        </post-collapsible>
      `);
  });
});
