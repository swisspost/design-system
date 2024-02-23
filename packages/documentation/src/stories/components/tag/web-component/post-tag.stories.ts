import type { Args, Meta, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { BADGE } from '../../../../../.storybook/constants';

const meta: Meta = {
  title: 'Components/Tag',
  component: 'post-tag',
  parameters: {
    badges: [BADGE.BETA],
  },
  args: {
    'variant': 'null',
    'size': 'null',
    'icon': '',
    'text': 'Tag',
    'slots-default': '',
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
    'text': {
      if: {
        arg: 'slots-default',
        eq: '',
      },
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

export const WC_Default: Story = {
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

export const WC_Variants: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      html`<div class="d-flex flex-wrap gap-3">${story(context.args, context)}</div>`,
  ],
  render: (args: Args, context: StoryContext) => {
    const variants = Object.entries(context.argTypes.variant.control.labels).slice(1);
    let icon = 1000;

    return html`
      ${variants.map(([variant, text]) =>
        WC_Default.render?.(
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
