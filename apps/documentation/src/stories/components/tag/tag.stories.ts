import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components-vite';
import { MetaComponent } from '@root/types';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export const CustomIconSignalMapping: Record<string, string> = {
  neutral: 'tag',
  info: 'notes',
  success: 'accessopen',
  warning: 'accessrestricted',
  error: 'userblocked',
};

const meta: MetaComponent = {
  id: '1b1ea384-7421-4064-ad34-e3f48a36b39f',
  title: 'Components/Tag',
  tags: ['package:Styles', 'status:InProgress'],
  render: renderTag,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=18807-68180&mode=design&t=PR2ZnqAacaK7UiXP-4',
    },
  },
  args: {
    variant: 'neutral',
    size: 'null',
    showIcon: false,
    icon: 'tag',
    markup: 'Tag',
  },
  argTypes: {
    variant: {
      name: 'Variant',
      description: 'Defines the color variant of the component.',
      control: {
        type: 'select',
      },
      options: ['neutral', 'info', 'success', 'warning', 'error'],
      table: {
        category: 'General',
      },
    },
    size: {
      name: 'Size',
      description: 'Defines the size of the component.',
      control: {
        type: 'radio',
        labels: {
          'null': 'Large',
          'tag-sm': 'Small',
        },
      },
      options: ['null', 'tag-sm'],
      table: {
        category: 'General',
      },
    },
    showIcon: {
      name: 'Show Icon',
      description:
        'Whether to render the tag with an icon or not. Note that if no icon is specified on a signal tag, there will always be a default one.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    icon: {
      name: 'Icon',
      description:
        'Defines the icon `name` inside of the component.<br/>To learn which icons are available, please visit our <a href="/?path=/docs/0dcfe3c0-bfc0-4107-b43b-7e9d825b805f--docs">icon library</a>.',
      control: {
        type: 'text',
      },
      if: {
        arg: 'showIcon',
        truthy: true,
      },
      table: {
        category: 'General',
      },
    },
    markup: {
      name: 'Markup',
      description:
        'The markup to put in the component.<br>Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content">inline content</a>.',
      control: {
        type: 'text',
      },
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

// RENDERER
function renderTag(args: Args) {
  const classes = [
    'tag',
    args.variant == 'neutral' ? args.variant : `tag-${args.variant}`,
    args.size,
  ]
    .filter(c => c !== 'neutral' && c !== 'null')
    .join(' ');

  return html`
    <div class="${classes}">
      ${args.showIcon ? unsafeHTML(`<post-icon name="${args.icon}"></post-icon>`) : nothing}
      ${unsafeHTML(args.markup)}
    </div>
  `;
}

type Story = StoryObj;

export const Default: Story = {};

export const Neutral: Story = {
  args: {
    showIcon: true,
  },
};

export const Variants: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      html`<div class="d-flex flex-wrap gap-16">${story(context.args, context)}</div>`,
  ],
  render: (args: Args, context: StoryContext) => {
    const variants: string[] = context.argTypes.variant.options.slice(1);

    return html` ${variants.map(variant =>
      renderTag({ ...args, variant, markup: variant.charAt(0).toUpperCase() + variant.slice(1) }),
    )}
    ${variants.map(variant =>
      renderTag({
        ...args,
        variant,
        icon: CustomIconSignalMapping[variant],
        showIcon: true,
        markup: variant.charAt(0).toUpperCase() + variant.slice(1),
      }),
    )}`;
  },
};
