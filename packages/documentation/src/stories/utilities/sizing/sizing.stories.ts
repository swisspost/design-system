import type { Args, Meta, StoryObj, StoryContext } from '@storybook/web-components';
import { html } from 'lit/static-html.js';
import { BADGE } from '../../../../.storybook/constants';
import './sizing.styles.scss';

const sizingOptions = [
  'auto',
  'hair',
  'line',
  'micro',
  'mini',
  'small-regular',
  'regular',
  'small-large',
  'large',
  'big',
  'bigger-big',
  'small-huge',
  'huge',
  'small-giant',
  'giant',
  'bigger-giant',
];

const sizeOptionsPercent = ['auto', '25', '50', '75', '100'];

const meta: Meta = {
  render: renderSizing,
  title: 'Utilities/Sizing',
  parameters: {
    badges: [BADGE.NEEDS_REVISION],
  },
  args: {
    height: 'bigger-giant',
    width: 'bigger-giant',
    border: false,
  },
  argTypes: {
    border: {
      control: {
        type: 'boolean',
      },
      table: {
        disable: true,
      },
    },
    height: {
      name: 'height',
      description: 'Set the height of the cube',
      control: {
        type: 'select',
      },
      options: sizingOptions,
    },
    width: {
      name: 'width',
      description: 'Set the width of the cube',
      control: {
        type: 'select',
      },
      options: sizingOptions,
    },
    maxHeight: {
      name: 'max-height',
      description: 'Set the maximum height of the cube',
      control: {
        type: 'select',
      },
      options: sizingOptions,
    },
    maxWidth: {
      name: 'max-width',
      description: 'Set the maximum width of the cube',
      control: {
        type: 'select',
      },
      options: sizingOptions,
    },
  },
};

export default meta;

type Story = StoryObj;

function renderSizing(args: Args) {
  const classes = `content h-${args.height} w-${args.width} mh-${args.maxHeight} mw-${args.maxWidth}`;

  return html`
    <div class="sizing-example">
      <div class="d-flex p-regular gap-regular" style="height: 150px">
        <div class="flex-fill">
          <div class="${classes}"></div>
        </div>

        <ul class="legend list-unstyled">
          <li class="d-flex align-items-center">
            <div class="h-regular w-regular me-mini content"></div>
            <span>content</span>
          </li>
        </ul>
      </div>
    </div>
  `;
}

export const Sizes: Story = {};
export const SizesPercent: Story = {
  args: {
    width: '25',
    height: '100',
    border: true,
  },
  argTypes: {
    height: {
      options: sizeOptionsPercent,
    },
    width: {
      options: sizeOptionsPercent,
    },
  },
};
