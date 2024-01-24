import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { BADGE } from '../../../../.storybook/constants';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: Meta = {
  title: 'Components/Tag',
  render: tagRender,
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    content: 'Tag',
    showIcon: true,
    disableIcon: false,
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
    disableIcon: {
      name: 'disableIcon',
      description:
        'Disables icon for wecomponent. Removes set property icon while active. To not have an icon display for the webcomponent simply do not set the icon property.',
      control: {
        type: 'boolean',
        if: { disableIcon: false },
      },
      table: {
        category: 'Storybook only',
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
        ? unsafeHTML(`<post-icon name="${args.icon}" class="post-tag-icon"></post-icon>`)
        : nothing}
      <div>${args.content}</div>
    </div>
  `;
}

export const Default: Story = {
  args: {
    icon: 1001,
    content: 'Tag',
    size: 'post-tag',
    color: 'gray',
  },
};

export const Variants: Story = {
  render: (args: Args) => {
    return html`
      ${VARIANTS_ARGS.forEach(args => tagRender(args))}
    `;
  },
};

const VARIANTS_ARGS: {
  args: {
    icon: number;
    content: string;
    size: string;
    color: string;
  };
}[] = [
  {
    args: {
      icon: 1001,
      content: 'Tag',
      size: 'post-tag',
      color: 'white',
    },
  },
  {
    args: {
      icon: 1001,
      content: 'Tag',
      size: 'post-tag',
      color: 'info',
    },
  },
  {
    args: {
      icon: 1001,
      content: 'Tag',
      size: 'post-tag',
      color: 'success',
    },
  },
  {
    args: {
      icon: 1001,
      content: 'Tag',
      size: 'post-tag',
      color: 'danger',
    },
  },
  {
    args: {
      icon: 1001,
      content: 'Tag',
      size: 'post-tag',
      color: 'warning',
    },
  },
  {
    args: {
      icon: 1001,
      content: 'Tag',
      size: 'post-tag',
      color: 'yellow',
    },
  },
];
