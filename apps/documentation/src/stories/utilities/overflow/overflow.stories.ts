import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';
import './overflow.styles.scss';

const meta: MetaExtended = {
  id: '4b505a3e-f4ce-48ce-8fae-6aa8158d66e8',
  title: 'Utilities/Overflow',
  tags: ['status:Stable'],
  args: {
    overflow: 'visible',
  },
  argTypes: {
    overflow: {
      name: 'Overflow',
      description: 'Sets the general overflow of the element.',
      control: {
        type: 'select',
      },
      options: ['unset', 'auto', 'hidden', 'scroll', 'visible'],
      table: {
        category: 'General',
      },
    },
    overflowX: {
      name: 'Overflow X',
      description: 'Sets the overflow of the x axis of the element.',
      control: {
        type: 'select',
      },
      options: ['unset', 'auto', 'hidden', 'scroll', 'visible'],
      table: {
        category: 'General',
      },
    },
    overflowY: {
      name: 'Overflow Y',
      description: 'Sets the overflow of the y axis of the element.',
      control: {
        type: 'select',
      },
      options: ['unset', 'auto', 'hidden', 'scroll', 'visible'],
      table: {
        category: 'General',
      },
    },
  },
  render: (args: Args) => {
    return html`
      <div
        class="my-container ${args.overflow && args.overflow !== 'unset'
          ? 'overflow-' + args.overflow
          : ''}${args.overflowX && args.overflowX !== 'unset'
          ? ' overflow-x-' + args.overflowX
          : ''}${args.overflowY && args.overflowY !== 'unset'
          ? ' overflow-y-' + args.overflowY
          : ''}"
      >
        <div class="content">
          This is a long text content that demonstrates how the overflow property works. This
          paragraph contains several sentences that will help show the different overflow behaviors
          when the container is too small to contain all the text. It's useful for testing different
          overflow settings and seeing how they affect the layout and scrolling capabilities of the
          container element.
        </div>
      </div>
    `;
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  decorators: [story => html` <div class="overflow-container">${story()}</div> `],
};
