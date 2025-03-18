import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';
import { parse } from '@/utils/sass-export';
import scss from './gutters.module.scss';
import './gutters.styles.scss';

export const SCSS_VARIABLES: Record<string, string> = parse(scss);

const sizes = Object.keys(SCSS_VARIABLES.spacing)
  .filter((key: string) => key.startsWith(`post-utility-gap-`))
  .map((key: string) => key.replace(`post-utility-gap-`, ''));

const meta: MetaExtended = {
  id: '64b63483-79fa-4e9f-9441-f7d6b2eabae2',
  title: 'Foundations/Layout/Gutters',
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const storyTemplate = html`<div class="gutters-example">
        ${story(context.args, context)}
      </div>`;
      return storyTemplate;
    },
  ],
};

export default meta;

type Story = StoryObj;

export const HorizontalGutters: Story = {
  argTypes: {
    gutterX: {
      name: 'Horizontal gutter (gx)',
      description: 'Sets the horizontal gutter size.',
      control: {
        type: 'select',
      },
      options: sizes,
    },
  },
  args: {
    gutterX: '12',
  },
  render: (args: Args) => {
    // used only for the snapshots
    const breakpointClass = args.breakpointClass ? `-${args.breakpointClass}` : '';
    return html`
      <div class="container">
        <div class="row gx${breakpointClass}-${args.gutterX}">
          <div class="col">col</div>
          <div class="col">col</div>
          <div class="col">col</div>
          <div class="col">col</div>
          </div>
        </div>
      </div>
    `;
  },
};

export const VerticalGutters: Story = {
  argTypes: {
    gutterY: {
      name: 'Vertical gutter (gy)',
      description: 'Sets the vertical gutter size.',
      control: {
        type: 'select',
      },
      options: sizes,
    },
  },
  args: {
    gutterY: '32',
  },
  render: (args: Args) => {
    // used only for the snapshots
    const breakpointClass = args.breakpointClass ? `-${args.breakpointClass}` : '';
    return html`
      <div class="container">
        <div class="row gy${breakpointClass}-${args.gutterY}">
          <div class="col-6">col</div>
          <div class="col-6">col</div>
          <div class="col-6">col</div>
          <div class="col-6">col</div>
          </div>
        </div>
      </div>
    `;
  },
};

export const GeneralGutters: Story = {
  argTypes: {
    gutter: {
      name: 'General gutter (g)',
      description: 'Sets the general gutter size.',
      control: {
        type: 'select',
      },
      options: sizes,
    },
  },
  args: {
    gutter: '64',
  },
  render: (args: Args) => {
    // used only for the snapshots
    const breakpointClass = args.breakpointClass ? `-${args.breakpointClass}` : '';
    return html`
      <div class="container">
        <div class="row g${breakpointClass}-${args.gutter}">
          <div class="col-6">col</div>
          <div class="col-6">col</div>
          <div class="col-6">col</div>
          <div class="col-6">col</div>
          </div>
        </div>
      </div>
    `;
  },
};
