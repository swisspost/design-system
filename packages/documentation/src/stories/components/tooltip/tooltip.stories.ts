import { Args, Meta, Story, StoryContext, StoryObj } from '@storybook/web-components';
import { BADGE } from '../../../../.storybook/constants';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Tooltip',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  render,
  args: {
    placement: 'top',
    background: 'bg-primary',
  },
  argTypes: {
    placement: {
      name: 'Placement',
      description:
        'Any <a href="https://floating-ui.com/docs/computePosition#placement" target="_blank">floating-ui placement option</a>. If the tooltip does not fit, it will flip to the opposite side.',
      control: {
        type: 'select',
      },
      options: [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ],
    },
    background: {
      name: 'Background',
      description:
        'Background color of the tooltip. Choose the one that provides the best contrast in your scenario.',
      control: {
        type: 'radio',
        label: {
          'bg-primary': 'Primary',
          'bg-yellow': 'Post yellow',
        },
      },
      options: ['bg-primary', 'bg-yellow'],
    },
  },
  decorators: [
    story =>
      html`
        <div style="margin-block: 5rem;">${story()}</div>
      `,
  ],
};

function render(args: Args, context: StoryContext) {
  return html`
    <button class="btn btn-icon btn-secondary btn-large" data-tooltip-target="tooltip-one">
      <post-icon name="3176"></post-icon>
    </button>
    <post-tooltip class="hydrated ${args.background}" id="tooltip-one" placement=${args.placement}>
      Shareholder value and a lot of other text just to show how that breaks on a new line.
    </post-tooltip>
  `;
}

export default meta;
export const Default: StoryObj = {};
