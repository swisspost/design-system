import { html, render } from 'lit';
import type { StoryObj } from '@storybook/web-components-vite';
import { schemes } from '@/shared/snapshots/schemes';

const meta = {
  title: 'Snapshots',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

const headingVariants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

function renderHeading(args: string) {
  const subtitleHtml = html`<span class="d-block fw-normal">Lorem ipsum dolor sit amet</span>`;

  const element = document.createElement(args as keyof HTMLElementTagNameMap);
  render(html`${args} - Lorem ipsum dolor sit${subtitleHtml}`, element);
  return element;
}

export const Typography: Story = {
  render: () => html`
    <!-- Headings -->
    ${schemes(
      () => html`
        <section>
          <h2>Headings</h2>
          ${headingVariants.map(args => renderHeading(args))}
        </section>

        <!-- Links -->
        <section>
          <h2>Links</h2>
          <a href="https://post.ch">Link Text</a>
          <a href="https://imgur.com/FKmX7dt">Link Text</a>

          <a href="https://post.ch">Lorem ipsum dolor sit amet consectetur</a>
          <a href="https://imgur.com/FKmX7dt">Lorem ipsum dolor sit amet consectetur</a>
        </section>

        <!-- Paragraphs -->
        <section>
          <h2>Paragraphs</h2>
          <p>
            This is a sample paragraph showing how text will appear in your application. It
            demonstrates the font style, size, and spacing that will be used throughout your
            content.
          </p>
          <p>
            Another paragraph follows to illustrate how multiple paragraphs will look. Notice the
            spacing between paragraphs and how the text flows naturally from one line to the next.
          </p>
          <p class="lead">
            This is a lead paragraph that stands out from regular text, typically used for
            introductory content.
          </p>
        </section>

        <!-- Legend -->
        <section>
          <h2>Legend</h2>
          <fieldset>
            <legend>Default legend</legend>
          </fieldset>

          <fieldset>
            <legend class="large">Large legend</legend>
          </fieldset>
        </section>

        <!-- Inline Elements -->
        <section>
          <h2>Inline Elements</h2>
          <p>This text contains <small>small inline text</small> for fine print or disclaimers.</p>

          <p>This text shows <strong>strong emphasis</strong> for important words or phrases.</p>

          <p>This text shows <em>emphasis through italics</em> for subtle highlighting.</p>

          <p>This text contains <sub>subscript text</sub> for chemical formulas or footnotes.</p>

          <p>This text contains <sup>superscript text</sup> for exponents or references.</p>

          <p>This text <mark>highlights important information</mark> for visual scanning.</p>

          <p>This text contains an <abbr title="abbreviation">abbr</abbr> element for shortened forms.</p>

          <p>This text shows <code>inline code examples</code> for technical documentation.</p>

          <p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy text to clipboard.</p>

          <p>This shows <del>deleted text</del> for tracking changes or corrections.</p>
        </section>
        </div>
      `,
    )}
  `,
};
