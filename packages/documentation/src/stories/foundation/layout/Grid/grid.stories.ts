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
    gutters: 'vertical-gutters',
  },
  argTypes: {
    gutters: {
      name: 'Gutter',
      description: 'Sets the padding inbetween the columns',

      control: {
        type: 'select',
        labels: {
          'border-gutters': 'border',
          'vertical-gutters': 'vertical',
        },
      },
      options: ['border-gutters', 'vertical-gutters'],
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
    const color: string = 'orange';
    const classes = mapClasses({ 'row': true, [args.gutters]: args.gutters, 'text-center': true });
    return html`
      <div class=${classes}>
        <div class="col-sm">
          <div class="container" style="background-color:${color}">col-sm 400px</div>
        </div>
        <div class="col-rg">
          <div class="container" style="background-color:${color}">col-rg 600px</div>
        </div>
        <div class="col-md">
          <div class="container" style="background-color:${color}">col-md 780px</div>
        </div>
        <div class="col-lg">
          <div class="container" style="background-color:${color}">col-lg 1024px</div>
        </div>
        <div class="col-xl">
          <div class="container" style="background-color:${color}">col-xl 1280px</div>
        </div>
        <div class="col-xxl">
          <div class="container" style="background-color:${color}">col-xxl 1441px</div>
        </div>
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
