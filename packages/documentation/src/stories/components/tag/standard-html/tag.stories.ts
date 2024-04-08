import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { MetaComponent } from '../../../../../types';
import { html, nothing } from 'lit';
import { BADGE } from '../../../../../.storybook/constants';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { parse } from '../../../../utils/sass-export';
import scss from '../tag.module.scss';

const SCSS_VARIABLES: any = parse(scss);

const meta: MetaComponent = {
  id: '1b1ea384-7421-4064-ad34-e3f48a36b39f',
  title: 'Components/Tag',
  tags: ['package:HTML'],
  parameters: {
    badges: [BADGE.BETA],
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
          'null': 'Default',
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
        'Defines the icon `name` inside of the component.<br/>To learn which icons are available, please visit our <a href="/?path=/docs/5704bdc4-c5b5-45e6-b123-c54d01fce2f1--docs" target="_blank">icon library</a>.',
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
        'The markup to put in the component.<br>Markup accepted: <a href="https://developer.mozilla.org/en-US/docs/Glossary/Inline-level_content" target="_blank">inline content</a>.',
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

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    const classes = [
      'tag',
      args.variant === 'null' ? args.variant : `tag-${args.variant}`,
      args.size,
    ]
      .filter(c => c !== 'null')
      .join(' ');

    return html`
      <div class="${classes}">
        ${args.showIcon ? unsafeHTML(`<post-icon name="${args.icon}"></post-icon>`) : nothing}
        <div class="tag-text">${unsafeHTML(args.markup)}</div>
      </div>
    `;
  },
};

export const Variants: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      html`<div class="d-flex flex-wrap gap-3">${story(context.args, context)}</div>`,
  ],
  render: (args: Args, context: StoryContext) => {
    const variants = Object.entries(context.argTypes.variant.control.labels).slice(1);
    let icon = 1000;

    return html`${variants.map(([variant, markup]) =>
      Default.render?.(
        { ...args, variant, markup, showIcon: true, icon: (icon++).toString() },
        context,
      ),
    )}`;
  },
};
