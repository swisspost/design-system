import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';
import './overflow.styles.scss';

const meta: MetaExtended = {
  id: '4b505a3e-f4ce-48ce-8fae-6aa8158d66e8',
  title: 'Utilities/Overflow',
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
      options: ['', 'auto', 'hidden', 'scroll', 'visible'],
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
      options: ['', 'auto', 'hidden', 'scroll', 'visible'],
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
      options: ['', 'auto', 'hidden', 'scroll', 'visible'],
      table: {
        category: 'General',
      },
    },
  },
  render: (args: Args) => {
    return html`
      <div
        class="bg-yellow ${args.overflow ? 'overflow-' + args.overflow : ''}${args.overflowX
          ? ' overflow-x-' + args.overflowX
          : ''}${args.overflowY ? ' overflow-y-' + args.overflowY : ''}"
      >
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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
