import { Args, Meta, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html } from 'lit';

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
    placement: 'top',
    background: 'bg-primary',
    message: 'Hi there 👋',
  },
  argTypes: {
    message: {
      name: 'Message',
      description: 'Tooltip content',
      control: {
        type: 'text',
      },
    },
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
    slot: {
      name: 'Slot',
      control: false,
      description:
        'The tooltip default slot accepts any <a href="https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content">inline content</a> like `<span>` or `<post-icon>`, but no interactive content like `<a>` or `<button>`.',
    },
  },
};

function render(args: Args) {
  // Just for fun
  const message = args.background === 'bg-yellow' ? args.message.replace('👋', '🤘🏾') : args.message;

  return html`
    <button class="btn btn-secondary btn-large" data-tooltip-target="tooltip-one">Button</button>
    <post-tooltip
      class="hydrated ${args.background}"
      id="tooltip-one"
      placement="${args.placement}"
    >
      ${message}
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
