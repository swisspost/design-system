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

function renderHeading(args: { [p: string]: unknown }) {
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
      <!-- Headings -->
      ${schemes(
        () => html`
          <section>
            <h2>Headings</h2>
            ${headingVariants.map(args => renderHeading(args))}
          </section>
        `,
      )}

      <!-- Links -->
      ${schemes(
        () => html`
          <section>
            <h2>Links</h2>
            <a href="https://post.ch">Link Text</a>
            <a href="https://imgur.com/FKmX7dt">Link Text</a>

            <a href="https://post.ch">Lorem ipsum dolor sit amet consectetur</a>
            <a href="https://imgur.com/FKmX7dt">Lorem ipsum dolor sit amet consectetur</a>
          </section>
        `,
      )}

      <!-- Paragraphs -->
      ${schemes(
        () => html`
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
        `,
      )}

      <!-- Legend -->
      ${schemes(
        () => html`
          <section>
            <h2>Legend</h2>
            <fieldset>
              <legend>Default legend</legend>
              <input type="text" placeholder="Text input" />
            </fieldset>

            <fieldset>
              <legend class="large">Large legend</legend>
              <input type="text" placeholder="Text input" />
            </fieldset>
          </section>
        `,
      )}

      <!-- Inline Elements -->
      ${schemes(
        () => html`
          <section>
            <h2>Inline Elements</h2>
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
          </section>
        `,
      )}
    </div>
  `,
};
