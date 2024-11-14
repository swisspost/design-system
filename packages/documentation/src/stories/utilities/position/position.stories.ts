import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';
import './position.styles.scss';
import { bombArgs } from '@/utils';

const meta: MetaExtended = {
  id: '803a58e8-c734-4ad7-80a8-62da1bb29d4b',
  title: 'Utilities/Position',
  args: {
    position: 'absolute',
    start: '50',
    top: '0',
    translateMiddle: true,
  },
  argTypes: {
    position: {
      name: 'Position',
      description: 'Sets the position. ',
      control: {
        type: 'select',
      },
      options: ['relative', 'static', 'absolute', 'fixed', 'sticky'],
      table: {
        category: 'General',
      },
    },
    top: {
      name: 'Top',
      description: 'Sets the distance from top. ',
      control: {
        type: 'select',
      },
      options: ['', '0', '50', '100'],
      table: {
        category: 'General',
      },
      if: {
        arg: 'bottom',
        truthy: false,
      },
    },
    bottom: {
      name: 'Bottom',
      description: 'Sets the distance from bottom. ',
      control: {
        type: 'select',
      },
      options: ['', '0', '50', '100'],
      table: {
        category: 'General',
      },
      if: {
        arg: 'top',
        truthy: false,
      },
    },
    start: {
      name: 'Start',
      description: 'Sets the distance from start (left in LTR). ',
      control: {
        type: 'select',
      },
      options: ['', '0', '50', '100'],
      table: {
        category: 'General',
      },
      if: {
        arg: 'end',
        truthy: false,
      },
    },
    end: {
      name: 'End',
      description: 'Sets the distance from end (right in LTR). ',
      control: {
        type: 'select',
      },
      options: ['', '0', '50', '100'],
      table: {
        category: 'General',
      },
      if: {
        arg: 'start',
        truthy: false,
      },
    },
    translateMiddle: {
      name: 'Translate middle',
      description: 'Set to true to center align an element based on its x and y position.',
      table: {
        category: 'General',
      },
      control: {
        type: 'boolean',
      },
    },
  },
  render: (args: Args) => {
    return html`
      <div
        class="bg-yellow position-${args.position} ${args.top ? 'top-' + args.top : ''}${args.bottom
          ? 'bottom-' + args.bottom
          : ''} ${args.start ? 'start-' + args.start : ''}${args.end
          ? 'end-' + args.end
          : ''} ${args.translateMiddle ? 'translate-middle' : ''}"
      ></div>
    `;
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    story =>
      html`
        <div class="position-container position-relative bg-gray">
          ${story()}
          ${bombArgs({
            start: ['0', '50', '100'],
            top: ['0', '50', '100'],
          }).map(
            args => html` <div class="pos-element top-${args.top} start-${args.start}"></div> `,
          )}
        </div>
      `,
  ],
};
export const TranslateMiddle: Story = {
  decorators: [
    story =>
      html` <div class="translate-middle-container position-relative bg-gray">${story()}</div> `,
  ],
  render: () => {
    return html`<div class="position-absolute start-50 top-50 bg-yellow"></div>
      <div class="position-absolute start-50 top-50 translate-middle bg-info"></div>`;
  },
};
