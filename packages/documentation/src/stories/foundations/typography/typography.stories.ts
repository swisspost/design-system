import { type Args, StoryObj } from '@storybook/web-components-vite';
import { MetaExtended } from '@root/types';
import { html, unsafeStatic } from 'lit/static-html.js';

const meta: MetaExtended = {
  id: '677cfabf-dbf0-4de2-ad07-6d5bfb9e2375',
  title: 'Foundations/Typography',
  tags: ['package:Styles'],
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const Link: Story = {
  render: () => html`
    <div>
      <a href="post.ch">Example Link</a>

      <p>
        This paragraph contains an inline
        <a href="post.ch">clickable</a>
        that demonstrates how hyperlinks will appear within body text.
      </p>
    </div>
  `,
};

export const Paragraph: Story = {
  render: () => html`
    <div>
      <p>
        This is a sample paragraph showing how text will appear in your application. It demonstrates
        the font style, size, and spacing that will be used throughout your content.
      </p>

      <p>
        Another paragraph follows to illustrate how multiple paragraphs will look. Notice the
        spacing between paragraphs and how the text flows naturally from one line to the next.
      </p>

      <p class="lead">
        This is a lead paragraph that stands out from regular text, typically used for introductory
        content.
      </p>
    </div>
  `,
};

export const Legend: Story = {
  render: () => html`
    <div>
      <fieldset>
        <legend>Default legend</legend>
      </fieldset>

      <fieldset>
        <legend class="large">Default legend</legend>
      </fieldset>
    </div>
  `,
};

export const Heading: Story = {
  render: () => html`
    <div>
      <h1>
        <span class="d-block">h1 Heading</span>
        <span class="fw-normal">h1 Subheading</span>
      </h1>

      <h2>
        <span class="d-block">h2 Heading</span>
        <span class="fw-normal">h2 Subheading</span>
      </h2>

      <h3>
        <span class="d-block">h3 Heading</span>
        <span class="fw-normal">h3 Subheading</span>
      </h3>

      <h4>
        <span class="d-block">h4 Heading</span>
        <span class="fw-normal">h4 Subheading</span>
      </h4>

      <h5>
        <span class="d-block">h5 Heading</span>
        <span class="fw-normal">h5 Subheading</span>
      </h5>

      <h6>
        <span class="d-block">h6 Heading</span>
        <span class="fw-normal">h6 Subheading</span>
      </h6>
    </div>
  `,
};

export const Inline: Story = {
  render: () => html`
    <div>
      <p>This text contains <small>small inline text</small> for fine print or disclaimers.</p>

      <p>This text shows <strong>strong emphasis</strong> for important words or phrases.</p>

      <p>This text shows <em>emphasis through italics</em> for subtle highlighting.</p>

      <p>This text contains <sub>subscript text</sub> for chemical formulas or footnotes.</p>

      <p>This text contains <sup>superscript text</sup> for exponents or references.</p>

      <p>This text <mark>highlights important information</mark> for visual scanning.</p>

      <p>
        This text contains an <abbr title="abbreviation">abbr</abbr> element for shortened forms.
      </p>

      <p>This text shows <code>inline code examples</code> for technical documentation.</p>

      <p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy text to clipboard.</p>

      <p>This shows <del>deleted text</del> for tracking changes or corrections.</p>
    </div>
  `,
};
