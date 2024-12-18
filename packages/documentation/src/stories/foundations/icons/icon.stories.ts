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
  render: args => html`<post-icon ${spreadArgs(normalizeArgs(args))}></post-icon>`,
};

export default meta;
type Story = StoryObj<Components.PostIcon>;

function normalizeArgs(args: Args) {
  // remove attribute with falsy values
  return Object.fromEntries(Object.entries(args).filter(([_, v]) => v));
}

const generateDecorators = (story: StoryFn, context: StoryContext, className?: string) => {
  return html`<div class="${ifDefined(className)}">${story(context.args, context)}</div>`;
};

const renderVariants = (
  args: Args,
  customAttrs: { [key: string]: string | boolean | number | undefined }[],
) => {
  return html`
    ${customAttrs.map(
      variantArgs =>
        html`<post-icon ${spread(normalizeArgs(args))} ${spread(variantArgs)}></post-icon>`,
    )}
  `;
};

const renderAnimateVariants = (args: Args, customAttrs: { name: string; animation: string }[]) => {
  return html`
    ${customAttrs.map(
      variantArgs =>
        html`
          <div class="w-half py-16">
            <p class="text-muted fs-tiny">Animation: ${variantArgs.animation}</p>
            <post-icon ${spread(normalizeArgs(args))} ${spread(variantArgs)}></post-icon>
          </div>
        `,
    )}
  `;
};

export const Default: Story = {
  decorators: [
    (story: StoryFn, context: StoryContext) => generateDecorators(story, context, 'fs-32'),
  ],
};

export const UI: Story = {
  args: {
    name: 'accessibility',
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => generateDecorators(story, context, 'resizer'),
  ],
};

export const Color: Story = {
  parameters: {
    controls: {
      exclude: ['base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args =>
    renderVariants(args, [
      { style: 'color: blue' },
      { style: 'color:#800080' },
      { style: 'color: rgb(230, 0, 0)' },
    ]),
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      generateDecorators(story, context, 'd-flex flex-wrap gap-8 fs-32'),
  ],
};

export const Size: Story = {
  parameters: {
    controls: {
      exclude: ['base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args =>
    renderVariants(args, [
      { style: 'font-size: 1rem' },
      { style: 'font-size: 3rem' },
      { style: 'font-size: 6rem' },
    ]),
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      generateDecorators(story, context, 'd-flex flex-column'),
  ],
};

export const Flip: Story = {
  parameters: {
    controls: {
      exclude: ['base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args =>
    renderVariants(args, [
      {},
      { 'flip-h': true },
      { 'flip-v': true },
      { 'flip-h': true, 'flip-v': true },
    ]),
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      generateDecorators(story, context, 'd-flex flex-wrap gap-8 fs-32'),
  ],
};

export const Scale: Story = {
  parameters: {
    controls: {
      exclude: ['base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args => renderVariants(args, [{ scale: 0.5 }, {}, { scale: 1.5 }]),
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      generateDecorators(story, context, 'd-flex flex-wrap gap-24 fs-32 scale-container'),
  ],
};

export const Rotate: Story = {
  parameters: {
    controls: {
      exclude: ['base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args =>
    renderVariants(args, [
      { rotate: -365 },
      { rotate: -249 },
      { rotate: -35.5 },
      { rotate: 0 },
      { rotate: 98 },
      { rotate: 365 },
      { rotate: 753 },
    ]),
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      generateDecorators(story, context, 'd-flex flex-wrap gap-8 fs-32'),
  ],
};

export const Animate: Story = {
  parameters: {
    controls: {
      exclude: ['name', 'base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args =>
    renderAnimateVariants(args, [
      { name: '2253', animation: 'cylon' },
      { name: '2252', animation: 'cylon-vertical' },
      { name: '2041', animation: 'spin' },
      { name: '2042', animation: 'spin-reverse' },
      { name: '2151', animation: 'fade' },
      { name: '2063', animation: 'throb' },
    ]),
  decorators: [
    (story: StoryFn, context: StoryContext) =>
      generateDecorators(story, context, 'd-flex flex-wrap text-center fs-32'),
  ],
};

export const CSS_Default: Story = {
  render: () => {
    return html`<div class="my-1022-icon"></div>`;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => generateDecorators(story, context, 'fs-32'),
  ],
};

export const CSS_UI: Story = {
  render: () => {
    return html`<div class="my-accessibility-icon"></div>`;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => generateDecorators(story, context, 'resizer'),
  ],
};

export const CSS_Color: Story = {
  render: () => {
    return html`<div class="my-1022-icon" style="color: blue"></div>`;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => generateDecorators(story, context, 'fs-32'),
  ],
};

export const CSS_Size: Story = {
  render: () => {
    return html`<div class="my-1022-icon" style="font-size: 3rem"></div>`;
  },
  decorators: [(story: StoryFn, context: StoryContext) => generateDecorators(story, context)],
};
