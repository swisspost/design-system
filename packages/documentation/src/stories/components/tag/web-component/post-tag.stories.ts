import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { BADGE } from '../../../../../.storybook/constants';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta: Meta<HTMLPostTagElement> = {
  title: 'Components/Tag',
  component: 'post-tag',
  render: postTagRender,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    innerHTML: 'Tag',
  },
  argTypes: {
    innerHTML: {
      name: 'Content',
      description: 'Content of Tag',
      control: {
        type: 'text',
      },
    },
    icon: {
      name: 'Icon',
      control: {
        type: 'number',
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
    },
  },
};

export default meta;

type Story = StoryObj;

function postTagRender(args: Args) {
  if (args.disableIcon) {
    args.icon = undefined;
    args.disableIcon = undefined;
  }
  return html`
    <post-tag
      icon=${ifDefined(args.icon)}
      color=${ifDefined(args.color)}
      size=${ifDefined(args.size)}
    >
      ${args.innerHTML}
    </post-tag>
  `;
}

export const PostTag: Story = {};
