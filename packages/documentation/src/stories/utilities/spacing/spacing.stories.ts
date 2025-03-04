import type { Args, StoryContext, StoryFn, StoryObj } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';
import { parse } from '@/utils/sass-export';
import scss from './spacing.module.scss';
import './spacing.styles.scss';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const SCSS_VARIABLES: any = parse(scss);

const properties = ['margin', 'padding', 'gap'];
const sizes = properties.reduce((options, property) => {
  return {
    ...options,
    [property]: Object.keys(SCSS_VARIABLES.spacing)
      .filter((key: string) => key.startsWith(`post-utility-${property}-`))
      .map((key: string) => key.replace(`post-utility-${property}-`, '')),
  };
}, {} as { [property: string]: string[] });

const sides = {
  null: 'All sides',
  x: 'x - Along the horizontal axis',
  y: 'y - Along the vertical axis',
  t: 't - At the top',
  b: 'b - At the bottom',
  s: 's - At the start',
  e: 'e - At the end',
};

const meta: MetaExtended = {
  id: 'facaacfd-18f1-49b4-80f1-a96680730fa0',
  title: 'Utilities/Spacing',
};

export default meta;

type Story = StoryObj;

function withLegend(template: TemplateResult, ...legendItems: string[]) {
  legendItems.unshift('element');
  return html`
    <div class="d-flex align-items-start justify-content-between">
      ${template}
      <ul class="legend list-unstyled">
        ${legendItems.map(
          item => html`
            <li class="d-flex align-items-center">
              <div class="h-16 w-16 me-8 ${item}"></div>
              <span>${item}</span>
            </li>
          `,
        )}
      </ul>
    </div>
  `;
}

export const MarginAndPadding: Story = {
  argTypes: {
    marginSides: {
      name: 'Sides',
      description: 'Sets the margin sides.',
      control: {
        type: 'select',
        labels: sides,
      },
      options: Object.keys(sides),
      table: {
        category: 'Margin',
      },
    },
    marginSize: {
      name: 'Size',
      description: 'Sets the margin size.',
      control: {
        type: 'select',
      },
      options: sizes.margin,
      table: {
        category: 'Margin',
      },
    },
    paddingSides: {
      name: 'Sides',
      description: 'Sets the padding sides.',
      control: {
        type: 'select',
        labels: sides,
      },
      options: Object.keys(sides),
      table: {
        category: 'Padding',
      },
    },
    paddingSize: {
      name: 'Size',
      description: 'Sets the padding size.',
      control: {
        type: 'select',
      },
      options: sizes.padding,
      table: {
        category: 'Padding',
      },
    },
  },
  args: {
    marginSides: 'null',
    marginSize: '20',
    paddingSides: 'null',
    paddingSize: '12',
  },
  render: (args: Args) => {
    const getPosition = (position: string) => (position === 'null' ? '' : position);
    const marginClass = `m${getPosition(args.marginSides)}-${args.marginSize}`;
    const paddingClass = `p${getPosition(args.paddingSides)}-${args.paddingSize}`;

    // used only for the snapshots
    const breakpointClasses = args.breakpointClasses ? ` ${args.breakpointClasses}` : '';

    return html` <div class="${marginClass} ${paddingClass}${breakpointClasses}"></div> `;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const storyTemplate = html`
        <div class="margin-padding-example">${story(context.args, context)}</div>
      `;
      return withLegend(storyTemplate, 'margin', 'padding');
    },
  ],
};

export const Gap: Story = {
  argTypes: {
    property: {
      name: 'Property',
      description: 'Sets the gap property.',
      control: {
        type: 'select',
      },
      options: ['gap', 'row-gap', 'column-gap'],
      table: {
        category: 'Gap',
      },
    },
    size: {
      name: 'Size',
      description: 'Sets the gap size.',
      control: {
        type: 'select',
      },
      options: sizes.gap,
      table: {
        category: 'Gap',
      },
    },
  },
  args: {
    property: 'gap',
    size: '16',
  },
  render: (args: Args) => {
    // used only for the snapshots
    const breakpointClass = args.breakpointClass ? ` ${args.breakpointClass}` : '';
    return html`
      <div
        class="${args.property}-${args.size}${breakpointClass}"
        style="display: grid; grid-template-columns: 1fr 1fr 1fr"
      >
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
        <div>Fourth child</div>
        <div>Fifth child</div>
        <div>Sixth child</div>
      </div>
    `;
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const storyTemplate = html`<div class="gap-example">${story(context.args, context)}</div>`;
      return withLegend(storyTemplate, 'gap');
    },
  ],
};
