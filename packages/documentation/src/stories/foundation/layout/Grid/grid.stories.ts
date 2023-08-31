import type { Args, Meta, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../../.storybook/constants';
import { mapClasses } from '../../../../utils';

const meta: Meta = {
  title: 'Foundations/Layout/Grid',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    gutters: '',
    size: 2,
    container: false,
  },
  argTypes: {
    gap: {
      name: 'Gap',
      description: 'Sets the margin inbetween the columns',

      control: {
        type: 'select',
        labels: {
          '': 'none',
          'gap-3': 'horizontal & vertical',
          'row-gap-3': 'vertical',
          'column-gap-3': 'horizontal',
        },
      },
      options: ['', 'gap-3', 'row-gap-3', 'column-gap-3'],
      table: {
        category: 'General',
      },
    },

    gutters: {
      name: 'Gutter',
      description: 'Sets the padding inbetween the columns',

      control: {
        type: 'select',
        labels: {
          '': 'none',
          'border-gutters': 'border',
          'vertical-gutters': 'vertical',
        },
      },
      options: ['', 'border-gutters', 'vertical-gutters'],
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
    const size: string = args.size ? '-' + args.size : '';

    const colorElement: string = 'orange';
    const colorPadding: string = 'grey';
    const colorMargin: string = 'black';
    const classes = mapClasses({ row: true, [args.gutters]: args.gutters, [args.gap]: args.gap });
    return html`
      <div class=${classes} style="background-color:${colorMargin}">
        <div class="col-4 col-rg-2" style="background-color:${colorPadding}">
          <div style="background-color:${colorElement}">col-4 col-rg-2</div>
        </div>
        <div class="col-4 col-rg-2" style="background-color:${colorPadding}">
          <div style="background-color:${colorElement}">col-4 col-rg-2</div>
        </div>
        <div class="col-4 col-rg-2" style="background-color:${colorPadding}">
          <div style="background-color:${colorElement}">col-4 col-rg-2</div>
        </div>
        <div class="col-4 col-rg-2" style="background-color:${colorPadding}">
          <div style="background-color:${colorElement}">col-4 col-rg-2</div>
        </div>
        <div class="col-4 col-rg-2" style="background-color:${colorPadding}">
          <div style="background-color:${colorElement}">col-4 col-rg-2</div>
        </div>
        <div class="col-4 col-rg-2" style="background-color:${colorPadding}">
          <div style="background-color:${colorElement}">col-4 col-rg-2</div>
        </div>
        <div class="col-6 col-rg-3" style="background-color:${colorPadding}">
          <div style="background-color:${colorElement}">col-6 col-rg-3</div>
        </div>
        <div class="col-6 col-rg-3" style="background-color:${colorPadding}">
          <div style="background-color:${colorElement}">col-6 col-rg-3</div>
        </div>
        <div class="col-6 col-rg-3" style="background-color:${colorPadding}">
          <div style="background-color:${colorElement}">col-6 col-rg-3</div>
        </div>
        <div class="col-6 col-rg-3" style="background-color:${colorPadding}">
          <div style="background-color:${colorElement}">col-6 col-rg-3</div>
        </div>
        <div class="col-12 col-rg-6" style="background-color:${colorPadding}">
          <div style="background-color:${colorElement}">col-12 col-rg-6</div>
        </div>
        <div class="col-12 col-rg-6" style="background-color:${colorPadding}">
          <div style="background-color:${colorElement}">col-12 col-rg-6</div>
        </div>
      </div>
    `;
  },
};

// export const Default: Story = {
//   render: (args: Args, context: StoryContext) => {
//     return html`
//       ${Temp.render?.({ ...context.args }, context)}
//     `;
//   },
// };
