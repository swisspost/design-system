import type { Args, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
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
      description:
        'This sets the innerHTML of the component, as you can see in the code above, and is where you place the text for the `post-tag`',
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
      control: {
        type: 'select',
        labels: {
          'tag': 'Large',
          'tag-sm': 'Small',
        },
      },
      options: ['tag', 'tag-sm'],
    },
    bgColor: {
      name: 'bgColor',
      control: {
        type: 'select',
        labels: {
          gray: 'Default',
          white: 'White',
          info: 'Info',
          success: 'Success',
          warning: 'Warning',
          danger: 'Danger (Error)',
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
  args.innerHTML = args.content ? args.content : args.innerHTML;
  return html`
    <post-tag
      icon=${ifDefined(args.icon)}
      bg-color=${ifDefined(args.bgColor)}
      size=${ifDefined(args.size)}
    >
      ${args.innerHTML}
    </post-tag>
  `;
}

export const PostTag: Story = {};

export const PostTagVariants: Story = {
  args: {
    icon: 1001,
  },
  render: (args: Args, context: StoryContext) => {
    return html`
      <div class="d-flex justify-content-evenly">
        ${context.argTypes.bgColor.options.map((bgColor: string) =>
          postTagRender({
            ...args,
            bgColor,
            innerHTML: context.argTypes.bgColor.control.labels[bgColor],
          }),
        )}
      </div>
    `;
  },
};
