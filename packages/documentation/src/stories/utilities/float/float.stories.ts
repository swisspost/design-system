import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';
import { nothing } from 'lit';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */

const meta: MetaExtended = {
  id: 'ccf092c1-f0ab-49a1-a612-87e5be23adde',
  title: 'Utilities/Float',
};

export default meta;

type Story = StoryObj;

export const Float: Story = {
  argTypes: {
    floatPosition: {
      name: 'float',
      description: 'Sets the float. ',
      control: {
        type: 'select',
      },
      options: ['start', 'end', 'none'],
      table: {
        category: 'Add float',
      },
    },
    floatBreakPoint: {
      name: 'breakpoint',
      description: 'Sets the float for a specific breakpoint. ',
      control: {
        type: 'select',
      },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      table: {
        category: 'Add float',
      },
    },
  },
  args: {
    floatPosition: null,
    floatBreakPoint: null,
  },
  render: (args: Args) => {
    const classMembers = ['float', args.floatBreakPoint ?? 'xs', args.floatPosition].filter(m => m);
    const floatClass =
      classMembers.length === 3 ? classMembers.filter(m => m !== 'xs').join('-') : nothing;

    return html`
      <div class="${floatClass}">Sample Text</div>
      <div class="clearfix"></div>
    `;
  },
};
