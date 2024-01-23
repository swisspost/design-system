import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  title: 'Components/Tag',
  render: renderTag,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    icon: 1001,
    content: 'letter',
  },
  argTypes: {
    icon: {
      name: 'Icon',
      description: 'Number of the icon that is diplayed alongside the text',
      control: {
        type: 'number',
      },
      table: {
        category: 'Content',
      },
    },
    content: {
      name: 'Content',
      description: 'Content of Tag',
      control: {
        type: 'text',
      },
      table: {
        category: 'Content',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

function renderTag(args: Args) {
  return html`
    <post-tag icon=${args.icon}>${args.content}</post-tag>
  `;
}

export const Default: Story = {};
