import { spread } from '@open-wc/lit-helpers';
import { Args, Meta, StoryObj } from '@storybook/web-components';
import { Components } from '@swisspost/design-system-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BADGE } from '../../../../.storybook/constants';

const meta: Meta = {
  component: 'post-icon',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    'name': '1022',
    'base': '',
    'flip-h': false,
    'flip-v': false,
    'scale': 1,
    'rotate': 0,
    'animation': null,
  },
  argTypes: {
    'name': {
      table: {
        category: 'General',
      },
    },
    'base': {
      table: {
        category: 'General',
      },
    },
    'flip-h': {
      table: {
        category: 'Transformation',
      },
    },
    'flip-v': {
      table: {
        category: 'Transformation',
      },
    },
    'scale': {
      control: {
        type: 'number',
        min: 0.5,
        max: 3,
        step: 0.1,
      },
      table: {
        category: 'Transformation',
      },
    },
    'rotate': {
      control: {
        type: 'number',
        min: -360,
        max: 360,
        step: 1,
      },
      table: {
        category: 'Transformation',
      },
    },
    'animation': {
      options: [null, 'cylon', 'cylon-vertical', 'spin', 'spin-reverse', 'fade', 'throb'],
      table: {
        category: 'Transformation',
      },
    },
  },
  render: args =>
    html`
      <post-icon ${spread(normalizeArgs(args))}></post-icon>
    `,
};

function normalizeArgs(args: Args) {
  return Object.assign({}, args, {
    'base': args.base || null,
    'scale': args.scale !== 1 ? args.scale : null,
    'rotate': args.rotate !== 0 ? args.rotate : null,
    'flip-h': args['flip-h'] !== false ? args['flip-h'] : null,
    'flip-v': args['flip-v'] !== false ? args['flip-v'] : null,
  });
}

const renderVariants = (
  args: Args,
  customAttrs: { [key: string]: string | boolean | number | undefined }[],
) => {
  return html`
    ${customAttrs.map(
      variantArgs =>
        html`
          <post-icon ${spread(normalizeArgs(args))} ${spread(variantArgs)}></post-icon>
        `,
    )}
  `;
};

const generateDecorators = (story: any, className?: string) => {
  return html`
    <div class=${ifDefined(className)} style="font-size: 32px">${story()}</div>
  `;
};

export default meta;

type Story = StoryObj<Components.PostIcon>;

export const Default: Story = {
  decorators: [story => generateDecorators(story)],
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
  decorators: [story => generateDecorators(story, 'd-flex flex-wrap gap-2')],
};

const sizeVariants = [
  { style: 'font-size: 1rem' },
  { class: 'h3' },
  { class: 'h1' },
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
  decorators: [story => generateDecorators(story, 'd-flex flex-column')],
};

const styleVariants = [
  { class: 'border rounded p-3', style: 'font-size: 4rem' },
  { class: 'border border-success rounded p-3 text-success', style: 'font-size: 4rem' },
  { class: 'rounded-circle bg-info p-3', style: 'font-size: 4rem' },
];

export const Style: Story = {
  parameters: {
    controls: {
      exclude: ['base', 'flip-h', 'flip-v', 'scale', 'rotate', 'animation'],
    },
  },
  render: args => renderVariants(args, styleVariants),
  decorators: [story => generateDecorators(story, 'd-flex flex-wrap gap-2')],
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
  decorators: [story => generateDecorators(story, 'd-flex flex-wrap gap-2')],
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
  decorators: [story => generateDecorators(story, 'd-flex flex-wrap gap-4')],
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
  decorators: [story => generateDecorators(story, 'd-flex flex-wrap gap-2')],
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
          <div class="w-50 py-3">
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
  decorators: [story => generateDecorators(story, 'd-flex flex-wrap text-center')],
};
