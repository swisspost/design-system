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
        'The tooltip default slot accepts any <a href="https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content">inline content</a> like `<span>` or `<post-icon>`, but no interactive content like `<a>` or `<button>` and no block level content like `<div>` or `p`.',
    },
  },
  // Provide some margin for the tooltip to fit comfortably inside the iFrame with overflow: hidden
  decorators: [
    story =>
      html`
        <div style="margin-block: 5rem;">${story()}</div>
      `,
  ],
};

function render(args: Args) {
  // Just for fun
  const message = args.background === 'bg-yellow' ? args.message.replace('👋', '👋🏿') : args.message;

  return html`
    <button
      class="btn btn-secondary btn-large"
      data-tooltip-target="tooltip-one"
      aria-describedby="tooltip-one"
    >
      Button
    </button>
    <post-tooltip class="hydrated ${args.background}" id="tooltip-one" placement=${args.placement}>
      ${message}
    </post-tooltip>
  `;
}

export default meta;
export const Default: StoryObj = {};
