import type { Args, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { BADGE } from '../../../../../.storybook/constants';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: Meta = {
  title: 'Components/Tag',
  render: tagRender,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    showIcon: true,
    icon: 1001,
    content: 'Tag',
    size: 'tag',
    color: 'gray',
  },
  argTypes: {
    showIcon: {
      name: 'Display icon',
      description: 'Wheter or not to show icon',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Content',
      },
    },
    icon: {
      name: 'Icon',
      description: `Any number of an Icon in the Swiss Post Icon Library. Example '1001' -> Letter`,
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
          'tag': 'Large',
          'tag-sm': 'Small',
        },
      },
      options: ['tag', 'tag-sm'],
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
          danger: 'Danger (Error)',
          warning: 'Warning',
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

function tagRender(args: Args) {
  return html`
    <div class="${args.size} bg-${args.color}">
      ${args.showIcon
        ? unsafeHTML(`<post-icon name="${args.icon}" class="tag-icon"></post-icon>`)
        : nothing}
      <div class="tag-content">${args.content}</div>
    </div>
  `;
}

export const Default: Story = {};

export const Variants: Story = {
  render: (args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex justify-content-evenly">
        ${context.argTypes.color.options.map((color: string) =>
          tagRender({ ...args, color, content: context.argTypes.color.control.labels[color] }),
        )}
      </div>
    `;
  },
};
