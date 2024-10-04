import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { MetaComponent } from '@root/types';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { parse } from '@/utils/sass-export';
import scss from '@/stories/components/tag/tag.module.scss';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const SCSS_VARIABLES: any = parse(scss);

const meta: MetaComponent = {
  id: '516917c9-ad12-484c-8bbd-e270e412f713',
  title: 'Components/Tag',
  component: 'post-tag',
  render: renderPostTag,
  tags: ['package:WebComponents'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/xZ0IW0MJO0vnFicmrHiKaY/Components-Post?type=design&node-id=18807-68180&mode=design&t=PR2ZnqAacaK7UiXP-4',
    },
  },
  args: {
    'variant': 'null',
    'size': 'null',
    'icon': '',
    'slots-default': 'Tag',
  },
  argTypes: {
    'variant': {
      control: {
        type: 'select',
        labels: {
          null: 'Default',
        },
      },
      options: ['null', ...SCSS_VARIABLES['tag-backgrounds']],
    },
    'size': {
      control: {
        type: 'radio',
        labels: {
          null: 'Large',
          sm: 'Small',
        },
      },
      options: ['null', 'sm'],
    },
    'slots-default': {
      name: 'default',
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;

// RENDERER
function renderPostTag(args: Args) {
  return html`
    <post-tag
      variant="${args.variant === 'null' ? nothing : args.variant}"
      size="${args.size === 'null' ? nothing : args.size}"
      icon="${args.icon || nothing}"
      text="${args['slots-default'] ? nothing : args.text}"
      >${unsafeHTML(args['slots-default'])}</post-tag
    >
  `;
}

type Story = StoryObj;

export const Default: Story = {};

export const Icon: Story = {
  args: {
    icon: 1001,
  },
};

export const Variants: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      html`<div class="d-flex flex-wrap gap-16">${story(context.args, context)}</div>`,
  ],
  render: (args: Args, context: StoryContext) => {
    const variants: string[] = context.argTypes.variant.options.slice(1);

    return html`
      ${variants.map(variant =>
        renderPostTag({
          ...args,
          variant,
          'slots-default': variant.charAt(0).toUpperCase() + variant.slice(1),
        }),
      )}
    `;
  },
};
