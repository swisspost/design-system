import { html } from 'lit';
import type { StoryObj } from '@storybook/web-components-vite';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';

const meta = {
  title: 'Snapshots',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj;

export const Headings: Story = {
  render: () => html`
    <div class="d-flex flex-column gap-32">
      <div>
        <h1>
          <span class="d-block">h1 - Lorem ipsum dolor sit</span>
          <span class="fw-normal">Lorem ipsum dolor sit amet</span>
        </h1>
        <h1>
          <span class="d-block">h1 - Lorem ipsum dolor sit amet consectetur adipisicing elit</span>
          <span class="fw-normal"
            >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam veniam inventore
            nulla</span
          >
        </h1>
        <h1>Lorem ipsum dolor sit (no subtitle)</h1>
      </div>

      <div>
        <h2>
          <span class="d-block">h2 - Lorem ipsum dolor sit</span>
          <span class="fw-normal">Lorem ipsum dolor sit amet</span>
        </h2>
        <h2>
          <span class="d-block">h2 - Long Title</span>
          <span class="fw-normal">Long subtitle for h2 heading</span>
        </h2>
        <h2>Lorem ipsum dolor sit (no subtitle)</h2>
      </div>

      <div>
        <h3>
          <span class="d-block">h3 - Lorem ipsum dolor</span>
          <span class="fw-normal">Short subtitle</span>
        </h3>
        <h3>Lorem ipsum dolor (no subtitle)</h3>
      </div>

      <div>
        <h4>
          <span class="d-block">h4 - Short Title</span>
          <span class="fw-normal">Lorem ipsum dolor</span>
        </h4>
      </div>

      <div>
        <h5>
          <span class="d-block">h5 - Short Title</span>
          <span class="fw-normal">Small subtitle</span>
        </h5>
      </div>

      <div>
        <h6>
          <span class="d-block">h6 - Very Small Title</span>
          <span class="fw-normal">Tiny subtitle</span>
        </h6>
      </div>
    </div>
  `,
};

export const Links: Story = {
  render: () => html`
    <div class="d-flex flex-column gap-24">
      <a href="https://example.com">Link Text</a>
      <a href="https://imgur.com/FKmX7dt">Lorem ipsum dolor sit amet consectetur</a>

      <p>
        Inline link inside paragraph:
        <a href="https://example.com">Example Link</a>
      </p>
      <p>
        Another with longer text:
        <a href="https://imgur.com/FKmX7dt">Click here for image</a>
      </p>
    </div>
  `,
};

export const Paragraphs: Story = {
  render: () => html`
    <div class="d-flex flex-column gap-24 font-sans-serif">
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
    <div class="d-flex flex-column gap-24">
      <fieldset>
        <legend>Default legend</legend>
        <input type="text" placeholder="Text input" />
      </fieldset>

      <fieldset>
        <legend class="large">Large legend</legend>
        <input type="text" placeholder="Text input" />
      </fieldset>
    </div>
  `,
};

export const InlineElements: Story = {
  render: () => html`
    <div class="d-flex flex-column gap-16">
      <p>This is <small>small inline text</small> for fine print or disclaimers.</p>
      <p>This is <strong>strong text</strong> to emphasize importance.</p>
      <p>This is <em>emphasized text</em> using italics.</p>
      <p>Here is <sub>subscript</sub> and <sup>superscript</sup>.</p>
      <p>This is <mark>highlighted text</mark> for attention.</p>
      <p>This contains an <abbr title="abbreviation">abbr</abbr> element.</p>
      <p>Inline <code>code sample</code> for dev use.</p>
      <p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>
      <p>This shows <del>deleted text</del> for corrections.</p>
    </div>
  `,
};

const headingVariants = bombArgs({
  title: [
    'Lorem ipsum dolor sit',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, libero. Dolore possimus ut atque quaerat nobis iusto vero, reiciendis sapiente',
  ],
  level: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  showSubtitle: [false, true],
  subtitle: [
    'Lorem ipsum dolor sit amet',
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam veniam inventore nulla saepe veritatis ut',
  ],
}).filter(args => {
  const subtitle = args.subtitle;
  return !(args.showSubtitle === false && typeof subtitle === 'string' && subtitle.length > 30);
});

function renderHeading(args: any) {
  const { level, title, showSubtitle, subtitle } = args;

  const subtitleHtml =
    showSubtitle && typeof subtitle === 'string'
      ? html`<span class="d-block fw-normal"> ${subtitle}</span>`
      : null;

  switch (level) {
    case 'h1':
      return html`<h1>h1 - ${title}${subtitleHtml}</h1>`;
    case 'h2':
      return html`<h2>h2 - ${title}${subtitleHtml}</h2>`;
    case 'h3':
      return html`<h3>h3 - ${title}${subtitleHtml}</h3>`;
    case 'h4':
      return html`<h4>h4 - ${title}${subtitleHtml}</h4>`;
    case 'h5':
      return html`<h5>h5 - ${title}${subtitleHtml}</h5>`;
    case 'h6':
      return html`<h6>h6 - ${title}${subtitleHtml}</h6>`;
    default:
      return null;
  }
}

export const Typography: Story = {
  render: () => html`
    <div class="d-flex flex-column gap-64">
      <!-- Headings -->
      ${schemes(
        () => html`
          <section>
            <h2>Headings</h2>
            <div class="d-flex flex-column gap-16">
              ${headingVariants.map(args => renderHeading(args))}
            </div>
          </section>
        `,
      )}

      <!-- Links -->
      // TODO:  update examples similar to Link Snapshots
      ${schemes(
        () => html`
          <section>
            <h2>Links</h2>
            <div class="d-flex flex-column gap-24">
              <a href="https://example.com">Link Text</a>
              <a href="https://imgur.com/FKmX7dt">Lorem ipsum dolor sit amet consectetur</a>

              <p>
                Inline link inside paragraph:
                <a href="https://example.com">Example Link</a>
              </p>
              <p>
                Another with longer text:
                <a href="https://imgur.com/FKmX7dt">Click here for image</a>
              </p>
            </div>
          </section>
        `,
      )}

      <!-- Paragraphs -->
      ${schemes(
        () => html`
          <section>
            <h2>Paragraphs</h2>
            <div class="d-flex flex-column gap-24 font-sans-serif">
              <p>
                This is a sample paragraph showing how text will appear in your application. It
                demonstrates the font style, size, and spacing that will be used throughout your
                content.
              </p>
              <p>
                Another paragraph follows to illustrate how multiple paragraphs will look. Notice
                the spacing between paragraphs and how the text flows naturally from one line to the
                next.
              </p>
              <p class="lead">
                This is a lead paragraph that stands out from regular text, typically used for
                introductory content.
              </p>
            </div>
          </section>
        `,
      )}

      <!-- Legend -->
      ${schemes(
        () => html`
          <section>
            <h2>Legend</h2>
            <div class="d-flex flex-column gap-24">
              <fieldset>
                <legend>Default legend</legend>
                <input type="text" placeholder="Text input" />
              </fieldset>

              <fieldset>
                <legend class="large">Large legend</legend>
                <input type="text" placeholder="Text input" />
              </fieldset>
            </div>
          </section>
        `,
      )}

      <!-- Inline Elements -->
      ${schemes(
        () => html`
          <section>
            <h2>Inline Elements</h2>
            <div class="d-flex flex-column gap-16">
              <p>This is <small>small inline text</small> for fine print or disclaimers.</p>
              <p>This is <strong>strong text</strong> to emphasize importance.</p>
              <p>This is <em>emphasized text</em> using italics.</p>
              <p>Here is <sub>subscript</sub> and <sup>superscript</sup>.</p>
              <p>
                This is
                <mark>highlighted text</mark>
                for attention.
              </p>
              <p>This contains an <abbr title="abbreviation">abbr</abbr> element.</p>
              <p>Inline <code>code sample</code> for dev use.</p>
              <p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>
              <p>
                This shows
                <del>deleted text</del>
                for corrections.
              </p>
            </div>
          </section>
        `,
      )}
    </div>
  `,
};
