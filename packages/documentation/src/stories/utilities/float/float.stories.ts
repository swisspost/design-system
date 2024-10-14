import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';
import './float.styles.scss';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */

const meta: MetaExtended = {
  id: 'ccf092c1-f0ab-49a1-a612-87e5be23adde',
  title: 'Utilities/Float',
};

export default meta;

type Story = StoryObj;

export const Float: Story = {
  argTypes: {
    floatPosition: {
      name: 'float',
      description: 'Sets the float. ',
      control: {
        type: 'select',
      },
      options: ['start', 'end', 'none'],
      table: {
        category: 'Add float',
      },
    },
    floatBreakPoint: {
      name: 'float',
      description: 'Sets the float for a specific breakpoint. ',
      control: {
        type: 'select',
      },
      options: ['', 'sm', 'md', 'lg', 'xl', 'xxl'],
      table: {
        category: 'Add float',
      },
    },
  },
  args: {
    floatPosition: '',
    floatBreakPoint: '',
  },
  render: (args: Args) => {
    const float = args.floatPosition !== '' ? `float` : '';
    const floatPosition = args.floatPosition !== '' ? `-${args.floatPosition}` : '';
    const floatBreakPoint = args.floatBreakPoint !== '' ? `-${args.floatBreakPoint}` : '';

    return html`
      <div class="float-example">
        <div class="${float}${floatBreakPoint}${floatPosition}">Sample Text</div>
      </div>
    `;
  },
};

export const FloatSnapshot: Story = {
  render: () => {
    const samples = [
      ['null', 'none'],
      ['null', 'start'],
      ['null', 'end'],
      ['sm', 'start'],
      ['md', 'end'],
      ['lg', 'none'],
      ['xl', 'start'],
      ['xxl', 'none'],
    ];

    return html`
      ${samples.map(([floatBreakPoint, floatPosition]) => {
        const fbp = floatBreakPoint !== 'null' ? `${floatBreakPoint}-` : '';
        return html`
          <div class="float-${fbp}${floatPosition}">Sample Text</div>
          <div class="clearfix"></div>
        `;
      })}
    `;
  },
};
