import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';
import { parse } from '@/utils/sass-export';
import scss from './gutters.module.scss';
import './gutters.styles.scss';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const SCSS_VARIABLES: any = parse(scss);

const properties = ['gap'];

const sizes = properties.reduce((options, property) => {
  return {
    ...options,
    [property]: Object.keys(SCSS_VARIABLES.spacing)
      .filter((key: string) => key.startsWith(`post-utility-${property}-`))
      .map((key: string) => key.replace(`post-utility-${property}-`, '')),
  };
}, {} as { [property: string]: string[] });

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
      options: sizes.gap,
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
            <div class="col">
             col
            </div>
            <div class="col">
             col
            </div>
            <div class="col">
             col
            </div>
           <div class="col">
           col
            </div>
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
      options: sizes.gap,
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
            <div class="col-6">
         col
            </div>
            <div class="col-6">
            col
            </div>
            <div class="col-6">
            col
            </div>
           <div class="col-6">
         col
            </div>
             <div class="col-6">
          col
            </div>
            <div class="col-6">
                  col
            </div>
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
      options: sizes.gap,
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
            <div class="col-6">
            <div>Text</div>
          </div>
          <div class="col-6">
            <div>Text</div>
          </div>
          <div class="col-6">
            <div>Text</div>
          </div>
          <div class="col-6">
            <div>Text</div>
          </div>
          </div>
        </div>
      </div>
    `;
  },
};
