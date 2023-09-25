import { Args, Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: Meta = {
  title: 'Components/Tooltip',
  component: 'post-tooltip',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
    controls: {
      exclude: ['class'],
    },
  },
  render,
  args: {
    background: 'bg-primary',
    innerHTML: 'Hi there 👋',
  },
  argTypes: {
    background: {
      name: 'Background',
      defaultValue: 'bg-primary',
      description:
        'Background color of the tooltip. Choose the one that provides the best contrast in your scenario.',
      control: {
        type: 'radio',
        labels: {
          'bg-primary': 'Primary',
          'bg-yellow': 'Post yellow',
        },
      },
      options: ['bg-primary', 'bg-yellow'],
    },
    innerHTML: {
      description:
        'Defines the HTML markup contained in the tooltip. Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content">inline content</a> like `<span>` or `<post-icon>`, but no interactive content like `<a>` or `<button>`.',
      table: {
        category: 'content',
        type: {
          summary: 'string',
        },
      },
    },
  },
};

function render(args: Args) {
  // Just for fun
  const innerHTML =
    args.background === 'bg-yellow' ? args.innerHTML.replace('👋', '🤘🏾') : args.innerHTML;

  return html`
    <button class="btn btn-secondary btn-large" data-tooltip-target="tooltip-one">Button</button>
    <post-tooltip
      class="hydrated ${args.background}"
      id="tooltip-one"
      placement="${args.placement}"
    >
      ${unsafeHTML(args.innerHTML)}
    </post-tooltip>
  `;
}

export default meta;
export const Default: StoryObj = {};

export const Paragraph: StoryObj = {
  render: (args: Args) => {
    return html`
      <p>
        This is a paragraph element with a
        <a href="#" data-tooltip-target="tooltip-two">tooltipped link</a>
        inside.
      </p>
      <post-tooltip
        class="hydrated ${args.background}"
        id="tooltip-two"
        placement="${args.placement}"
      >
        This is not the link you are looking for
      </post-tooltip>
    `;
  },
};

export const Multiple: StoryObj = {
  render: (args: Args) => {
    return html`
      <button class="btn btn-secondary btn-large" data-tooltip-target="tooltip-three">
        Tooltip button
      </button>
      <button class="btn btn-secondary btn-large" data-tooltip-target="tooltip-three">
        Same tooltip, different button
      </button>
      <post-tooltip
        class="hydrated ${args.background}"
        id="tooltip-three"
        placement="${args.placement}"
      >
        I'm the same, no matter what
      </post-tooltip>
    `;
  },
};
