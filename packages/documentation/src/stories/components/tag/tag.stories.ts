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
    content: 'Tag',
    size: 'tag',
    color: 'gray',
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
    size: {
      name: 'Size',
      description: 'Number of the icon that is diplayed alongside the text',
      control: {
        type: 'select',
        labels: {
          'post-tag': 'Large',
          'post-tag-sm': 'Small',
        },
      },
      options: ['post-tag', 'post-tag-sm'],
      table: {
        category: 'Content',
      },
    },
    color: {
      name: 'Color',
      description: 'The background color of the tag',
      control: {
        type: 'select',
        labels: {
          gray: 'Default',
          white: 'White',
          info: 'Info',
          success: 'Success',
          warning: 'Warning',
          danger: 'Danger',
          yellow: 'Yellow',
        },
      },
      options: ['gray', 'white', 'info', 'success', 'warning', 'danger', 'yellow'],
      table: {
        category: 'Content',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

function renderTag(args: Args) {
  /*   return html`
    <post-tag icon=${args.icon} color=${args.color} size=${args.size}>${args.content}</post-tag>
  `; */
  return html`
    <div class="${args.size} bg-${args.color}">
      <post-icon name="${args.icon}" class="tag-icon"></post-icon>
      <span>${args.content}</span>
    </div>
  `;
}

export const Default: Story = {};
