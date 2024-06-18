import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import './spacing.styles.scss';
import { parse } from '@/utils/sass-export';
import scss from './spacing.module.scss';
import { MetaExtended } from '@root/types';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const SCSS_VARIABLES: any = parse(scss);

const sizingOptions = ['0', '1', '2', '3', '4', '5', 'auto', ...Object.keys(SCSS_VARIABLES.sizes)];

const positionOptions = {
  null: 'All around',
  x: 'Along the horizontal axis',
  y: 'Along the vertical axis',
  t: 'At the top',
  b: 'At the bottom',
  e: 'To the right',
  s: 'To the left',
};

const meta: MetaExtended = {
  id: 'facaacfd-18f1-49b4-80f1-a96680730fa0',
  title: 'Utilities/Spacing',
  parameters: {
    badges: [],
  },
  args: {
    marginSize: 'regular',
    marginPosition: 'null',
    paddingSize: 'regular',
    paddingPosition: 'null',
  },
  argTypes: {
    marginSize: {
      name: 'Margin size',
      description: 'Sets the size of the Margin.',
      control: {
        type: 'select',
      },
      options: sizingOptions,
      table: {
        category: 'General',
      },
    },
    marginPosition: {
      name: 'Margin Position',
      description: 'Sets the position of the Margin.',
      control: {
        type: 'select',
        labels: positionOptions,
      },
      options: Object.keys(positionOptions),
      table: {
        category: 'General',
      },
    },
    paddingSize: {
      name: 'Padding size',
      description: 'Sets the size of the Padding.',
      control: {
        type: 'select',
      },
      options: sizingOptions.filter(option => option !== 'auto'),
      table: {
        category: 'General',
      },
    },
    paddingPosition: {
      name: 'Padding Position',
      description: 'Sets the position of the Padding.',
      control: {
        type: 'select',
        labels: positionOptions,
      },
      options: Object.keys(positionOptions),
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
    // this will be the only code visible in the code preview
    return html`
      <div
        class="w-bigger-giant h-bigger-giant m${args.marginPosition === 'null'
          ? ''
          : args.marginPosition}-${args.marginSize} p${args.paddingPosition === 'null'
          ? ''
          : args.paddingPosition}-${args.paddingSize}"
      ></div>
    `;
  },
  decorators: [
    // everything in here will be visible in the example, but only the content coming from the `story` function will be shown in the code preview
    (story: StoryFn, { args, context }: StoryContext) => html`
      <div class="spacing-example d-flex gap-3">
        <div class="d-none">${story(args, context)}</div>

        <div class="d-flex flex-fill">
          <div
            class="margin ${['null', 'x', 's', 'e'].includes(args.marginPosition as string) &&
            args.marginSize === 'auto'
              ? 'w-100'
              : ''}"
          >
            <div
              class="w-bigger-giant h-bigger-giant padding m${args.marginPosition === 'null'
                ? ''
                : args.marginPosition}-${args.marginSize} p${args.paddingPosition === 'null'
                ? ''
                : args.paddingPosition}-${args.paddingSize}"
            >
              <div class="h-100 content"></div>
            </div>
          </div>
        </div>

        <ul class="legend list-unstyled">
          <li class="d-flex align-items-center">
            <div class="h-regular w-regular me-mini margin"></div>
            <span>margin</span>
          </li>
          <li class="d-flex align-items-center">
            <div class="h-regular w-regular me-mini padding"></div>
            <span>padding</span>
          </li>
          <li class="d-flex align-items-center">
            <div class="h-regular w-regular me-mini content"></div>
            <span>content</span>
          </li>
        </ul>
      </div>
    `,
  ],
};

export const ResponsiveExample: Story = {
  render: () => {
    return html` <div class="h-bigger-giant w-bigger-giant p-regular p-lg-big"></div> `;
  },
  decorators: [
    // everything in here will be visible in the example, but only the content coming from the `story` function will be shown in the code preview
    (story: StoryFn, { args, context }: StoryContext) => html`
      <div class="spacing-example p-regular">
        <div class="d-none">${story(args, context)}</div>
        <div class="padding h-bigger-giant w-bigger-giant p-regular p-lg-big">
          <div class="content h-100"></div>
        </div>
        <p><small>Resize the browser window to see changes.</small></p>
      </div>
    `,
  ],
};

export const AutomaticResponsiveExample: Story = {
  render: () => {
    return html` <div class="h-bigger-giant w-bigger-giant p-large-r"></div> `;
  },
  decorators: [
    (story: StoryFn, { args, context }: StoryContext) => html`
      <div class="spacing-example p-regular">
        <div class="d-none">${story(args, context)}</div>
        <div class="padding h-bigger-giant w-bigger-giant p-large-r">
          <div class="content h-100"></div>
        </div>
        <p><small>Resize the browser window to see changes.</small></p>
      </div>
    `,
  ],
};
