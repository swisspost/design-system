import { spread } from '@open-wc/lit-helpers';
import { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { spreadArgs } from '@/utils';
import { Components } from '@swisspost/design-system-components/src';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '0dcfe3c0-bfc0-4107-b43b-7e9d825b805f',
  title: 'Foundations/Icons',
  tags: ['package:WebComponents'],
  component: 'post-icon',
  parameters: {
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/UaB0mWErj7GtdN9holV2IL/Icons-Post?type=design&node-id=0-1&mode=design&t=bBvDI0AyK2xagr22-0',
    },
  },
  args: {
    name: '1022',
    base: '',
    flipH: false,
    flipV: false,
    scale: null,
    rotate: null,
    animation: null,
  },
  argTypes: {
    name: {
      table: {
        category: 'General',
      },
    },
    base: {
      table: {
        category: 'General',
      },
    },
    scale: {
      control: {
        type: 'number',
        min: 0.5,
        max: 3,
        step: 0.1,
      },
    },
    rotate: {
      control: {
        type: 'number',
        min: -360,
        max: 360,
        step: 1,
      },
    },
    animation: {
      options: [null, 'cylon', 'cylon-vertical', 'spin', 'spin-reverse', 'fade', 'throb'],
    },
  },
  render: args => html` <post-icon ${spreadArgs(normalizeArgs(args))}></post-icon> `,
};

function normalizeArgs(args: Args) {
  // remove attribute with falsy values
  return Object.fromEntries(Object.entries(args).filter(([_, v]) => v));
}

const renderVariants = (
  args: Args,
  customAttrs: { [key: string]: string | boolean | number | undefined }[],
) => {
  return html`
    ${customAttrs.map(
      variantArgs =>
        html` <post-icon ${spread(normalizeArgs(args))} ${spread(variantArgs)}></post-icon> `,
    )}
  `;
};

const generateDecorators = (story: StoryFn, context: StoryContext, className?: string) => {
  return html`
    <div class="${ifDefined(className)}" style="font-size: 32px">
      ${story(context.args, context)}
    </div>
  `;
};

export default meta;

type Story = StoryObj<Components.PostIcon>;

export const Default: Story = {
  decorators: [(story: StoryFn, context: StoryContext) => generateDecorators(story, context)],
};

const colorVariants = [
  { class: 'text-primary' },
  { class: 'text-info' },
  { class: 'text-success' },
  { style: 'color: blue' },
  { style: 'color:#800080' },
  { style: 'color: rgb(230, 0, 0)' },
];

export const Color: Story = {
  parameters: {
    controls: {
      exclude: ['base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args => renderVariants(args, colorVariants),
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      generateDecorators(story, context, 'd-flex flex-wrap gap-8'),
  ],
};

const sizeVariants = [
  { style: 'font-size: 1rem' },
  { class: 'h3 my-0' },
  { class: 'h1 my-0' },
  { class: 'fs-huge' },
  { style: 'font-size: 4rem' },
  { style: 'font-size: 6rem' },
];

export const Size: Story = {
  parameters: {
    controls: {
      exclude: ['base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args => renderVariants(args, sizeVariants),
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      generateDecorators(story, context, 'd-flex flex-column'),
  ],
};

const styleVariants = [
  { class: 'border rounded p-16', style: 'font-size: 4rem' },
  { class: 'border border-success rounded p-16 text-success', style: 'font-size: 4rem' },
  { class: 'rounded-circle bg-info p-16', style: 'font-size: 4rem' },
];

export const Style: Story = {
  parameters: {
    controls: {
      exclude: ['base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args => renderVariants(args, styleVariants),
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      generateDecorators(story, context, 'd-flex flex-wrap gap-8'),
  ],
};

const flipVariants = [
  {},
  { 'flip-h': true },
  { 'flip-v': true },
  { 'flip-h': true, 'flip-v': true },
];

export const Flip: Story = {
  parameters: {
    controls: {
      exclude: ['base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args => renderVariants(args, flipVariants),
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      generateDecorators(story, context, 'd-flex flex-wrap gap-8'),
  ],
};

const scaleVariants = [
  { class: 'bg-info', scale: 0.5 },
  { class: 'bg-info' },
  { class: 'bg-info', scale: 1.5 },
];

export const Scale: Story = {
  parameters: {
    controls: {
      exclude: ['base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args => renderVariants(args, scaleVariants),
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      generateDecorators(story, context, 'd-flex flex-wrap gap-24'),
  ],
};

const rotateVariants = [
  { rotate: -365 },
  { rotate: -249 },
  { rotate: -35.5 },
  { rotate: 0 },
  { rotate: 98 },
  { rotate: 365 },
  { rotate: 753 },
];

export const Rotate: Story = {
  parameters: {
    controls: {
      exclude: ['base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args => renderVariants(args, rotateVariants),
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      generateDecorators(story, context, 'd-flex flex-wrap gap-8'),
  ],
};

const animateVariants = [
  { name: '2253', animation: 'cylon' },
  { name: '2252', animation: 'cylon-vertical' },
  { name: '2041', animation: 'spin' },
  { name: '2042', animation: 'spin-reverse' },
  { name: '2151', animation: 'fade' },
  { name: '2063', animation: 'throb' },
];

const renderAnimateVariants = (args: Args, customAttrs: { name: string; animation: string }[]) => {
  return html`
    ${customAttrs.map(
      variantArgs =>
        html`
          <div class="w-50 py-16">
            <p class="text-muted fs-tiny">Animation: ${variantArgs.animation}</p>
            <post-icon ${spread(normalizeArgs(args))} ${spread(variantArgs)}></post-icon>
          </div>
        `,
    )}
  `;
};

export const Animate: Story = {
  parameters: {
    controls: {
      exclude: ['name', 'base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args => renderAnimateVariants(args, animateVariants),
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      generateDecorators(story, context, 'd-flex flex-wrap text-center'),
  ],
};

export const ScssMixin: Story = {
  render: () => {
    return html`
      <div class="my-accessibility-icon my-icon-1"></div>
      <div class="my-accessibility-icon my-icon-2"></div>
      <div class="my-accessibility-icon my-icon-3"></div>
      <div class="my-accessibility-icon my-icon-4"></div>
      <div class="my-accessibility-icon my-icon-5"></div>
      <div class="my-accessibility-icon my-icon-6"></div>
      <hr />
      <div class="my-handvictory-icon" style="color: currentColor"></div>
      <div class="my-handvictory-icon" style="width: 32px; height: 32px;"></div>
      <div class="my-handvictory-icon" style="width: 64px; height: 64px; color: #f60;"></div>
      <div class="my-handvictory-icon" style="width: 48px; height: 48px;"></div>
      <div
        class="my-handvictory-icon"
        style="width: 32px; height: 32px; color: hsl(230, 90%, 40%); transform: rotate(15deg)"
      ></div>
    `;
  },
};
