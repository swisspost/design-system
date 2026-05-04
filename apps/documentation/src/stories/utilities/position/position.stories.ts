import type { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit/static-html.js';
import { MetaExtended } from '@root/types';
import './position.styles.scss';
import { bombArgs } from '@/utils';

const meta: MetaExtended = {
  id: '803a58e8-c734-4ad7-80a8-62da1bb29d4b',
  title: 'Utilities/Position',
  tags: ['status:Stable'],
  args: {
    position: 'absolute',
    top: '0',
    bottom: 'unset',
    start: '50',
    end: 'unset',
    translateMiddle: 'both',
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
      options: ['unset', '0', '50', '100'],
      table: {
        category: 'General',
      },
    },
    bottom: {
      name: 'Bottom',
      description: 'Sets the distance from bottom. ',
      control: {
        type: 'select',
      },
      options: ['unset', '0', '50', '100'],
      table: {
        category: 'General',
      },
    },
    start: {
      name: 'Start',
      description: 'Sets the distance from start (left in LTR). ',
      control: {
        type: 'select',
      },
      options: ['unset', '0', '50', '100'],
      table: {
        category: 'General',
      },
    },
    end: {
      name: 'End',
      description: 'Sets the distance from end (right in LTR). ',
      control: {
        type: 'select',
      },
      options: ['unset', '0', '50', '100'],
      table: {
        category: 'General',
      },
    },
    translateMiddle: {
      name: 'Translate middle',
      description: 'Set to true to center align an element based on its x and y position.',
      control: {
        type: 'select',
      },
      options: ['unset', 'both', 'x', 'y'],
      table: {
        category: 'General',
      },
    },
  },
  render: (args: Args) => {
    let classes = '';
    if (args.start !== 'unset') {
      classes += ' start-' + args.start;
    }

    if (args.end !== 'unset') {
      classes += ' end-' + args.end;
    }

    if (args.top !== 'unset') {
      classes += ' top-' + args.top;
    }

    if (args.bottom !== 'unset') {
      classes += ' bottom-' + args.bottom;
    }

    if (args.translateMiddle === 'both') {
      classes += ' translate-middle';
    } else if (args.translateMiddle === 'x') {
      classes += ' translate-middle-x';
    } else if (args.translateMiddle === 'y') {
      classes += ' translate-middle-y';
    }

    return html` <div class="my-element position-${args.position}${classes}"></div> `;
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  decorators: [
    (story, context) => html`
      <div class="position-outer-container position-outer-container-${context.args.position}">
        ${context.args.position === 'fixed' ? html`<img src="../images/browser-bg-top.png" />` : ''}
        <div class="position-container position-relative">
          ${story()}
          ${bombArgs({
            start: ['0', '50', '100'],
            bottom: ['0', '50', '100'],
            top: ['0', '50', '100'],
            end: ['0', '50', '100'],
          }).map(
            args => html` <div class="pos-element top-${args.top} start-${args.start}"></div> `,
          )}
        </div>
      </div>
    `,
  ],
};

export const TranslateMiddle: Story = {
  decorators: [
    story => html` <div class="translate-middle-container position-relative">${story()}</div> `,
  ],
  render: () => {
    return html` <div class="position-absolute start-50 top-50"></div>
      <div class="position-absolute start-50 top-50 translate-middle"></div>`;
  },
};
