import { newSpecPage } from '@stencil/core/testing';
import { PostCollapsible } from '../post-collapsible';

// HTMLUnknownElement is not implemented in JSDOM, thus it has to be mocked
// More information: https://jestjs.io/docs/26.x/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'HTMLUnknownElement', {
  writable: true,
  value: class MockHTMLUnknownElement {}
});

describe('post-collapsible', () => {
  it('should render without header', async () => {
    // disable warnings, only relevant during development
    jest.spyOn(console, 'warn').mockImplementation(jest.fn());

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
                <slot name="header"></slot>
              </button>
            </h2>
            <div aria-labelledby="post-collapsible-0--header" class="accordion-collapse collapse show" id="post-collapsible-0--collapse">
              <div class="accordion-body">
                <slot></slot>
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
