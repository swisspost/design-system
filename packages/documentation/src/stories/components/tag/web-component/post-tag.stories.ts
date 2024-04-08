import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { MetaComponent } from '../../../../../types';
import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { parse } from '../../../../utils/sass-export';
import scss from '../tag.module.scss';

const SCSS_VARIABLES: any = parse(scss);

const meta: MetaComponent = {
  id: '516917c9-ad12-484c-8bbd-e270e412f713',
  title: 'Components/Tag',
  component: 'post-tag',
  tags: ['package:WebComponents'],
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
    const variants: string[] = context.argTypes.variant.options.slice(1);

    return html`
      ${variants.map(variant =>
        Default.render?.(
          {
            ...args,
            variant,
            "slots-default": variant.charAt(0).toUpperCase() + variant.slice(1),
          },
          context,
        ),
      )}
    `;
  },
};
