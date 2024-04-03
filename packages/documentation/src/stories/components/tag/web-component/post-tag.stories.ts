import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { MetaComponent } from '../../../../../types';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { BADGE } from '../../../../../.storybook/constants';

const meta: MetaComponent = {
  id: '516917c9-ad12-484c-8bbd-e270e412f713',
  title: 'Components/Tag',
  component: 'post-tag',
  tags: ['package:WebComponents'],
  parameters: {
    badges: [BADGE.BETA],
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
          gray: 'Gray',
          white: 'White',
          info: 'Info',
          success: 'Success',
          danger: 'Danger',
          warning: 'Warning',
          yellow: 'Yellow',
        },
      },
      options: ['null', 'gray', 'white', 'info', 'success', 'warning', 'danger', 'yellow'],
    },
    'size': {
      control: {
        type: 'radio',
        labels: {
          null: 'Default',
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

type Story = StoryObj;

export const Default: Story = {
  render: (args: Args) => {
    return html`
      <post-tag
        variant="${args.variant === 'null' ? nothing : args.variant}"
        size="${args.size === 'null' ? nothing : args.size}"
        icon="${args.icon || nothing}"
        text="${args['slots-default'] ? nothing : args.text}"
        >${unsafeHTML(args['slots-default'])}</post-tag
      >
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

    return html`
      ${variants.map(([variant, text]) =>
        Default.render?.(
          {
            ...args,
            variant,
            icon: (icon++).toString(),
            text,
          },
          context,
        ),
      )}
    `;
  },
};
