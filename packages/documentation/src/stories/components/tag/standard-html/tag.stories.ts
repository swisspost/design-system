import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { MetaComponent } from '@root/types';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { parse } from '@/utils/sass-export';
import scss from '@/stories/components/tag/tag.module.scss';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const SCSS_VARIABLES: any = parse(scss);

const meta: MetaComponent = {
  id: '1b1ea384-7421-4064-ad34-e3f48a36b39f',
  title: 'Components/Tag',
  tags: ['package:HTML'],
  render: renderTag,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=18807-68180&mode=design&t=PR2ZnqAacaK7UiXP-4',
    },
  },
  args: {
    variant: 'null',
    size: 'null',
    showIcon: false,
    icon: 1001,
    markup: 'Tag',
  },
  argTypes: {
    variant: {
      name: 'Variant',
      description: 'Defines the color variant of the component.',
      control: {
        type: 'select',
        labels: {
          null: 'Default',
        },
      },
      options: ['null', ...SCSS_VARIABLES['tag-backgrounds']],
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
      description: 'Whether to renderd the component with an icon or not.',
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
        'Defines the icon `name` inside of the component.<br/>To learn which icons are available, please visit our <a href="/?path=/docs/5704bdc4-c5b5-45e6-b123-c54d01fce2f1--docs">icon library</a>.',
      control: {
        type: 'number',
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
  const classes = ['tag', args.variant === 'null' ? args.variant : `tag-${args.variant}`, args.size]
    .filter(c => c !== 'null')
    .join(' ');

  return html`
    <div class="${classes}">
      ${args.showIcon ? unsafeHTML(`<post-icon name="${args.icon}"></post-icon>`) : nothing}
      <div class="tag-text">${unsafeHTML(args.markup)}</div>
    </div>
  `;
}

type Story = StoryObj;

export const Default: Story = {};

export const Icon: Story = {
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

    return html`${variants.map(variant =>
      renderTag({ ...args, variant, markup: variant.charAt(0).toUpperCase() + variant.slice(1) }),
    )}`;
  },
};
