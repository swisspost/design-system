import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sizing.styles.scss';
import { MetaExtended } from '@root/types';
const sizeOptionsPercent = ['auto', '0', '25', '50', '75', '100'];

const meta: MetaExtended = {
  render: renderSizing,
  id: 'e728de1f-0d71-4317-8bb8-cbef0bf8d5db',
  title: 'Utilities/Sizing',
  parameters: {
    badges: [],
  },
  args: {
    height: 'null',
    width: 'null',
    maxHeight: 'null',
    maxWidth: 'null',
    minHeight: 'null',
    minWidth: 'null',
  },
  argTypes: {
    height: {
      name: 'height',
      description: 'Set the height of the rectangle',
      control: {
        type: 'select',
      },
      options: sizeOptionsPercent,
      table: {
        category: 'Height',
      },
    },
    width: {
      name: 'width',
      description: 'Set the width of the rectangle',
      control: {
        type: 'select',
      },
      options: sizeOptionsPercent,
      table: {
        category: 'Width',
      },
    },
    maxHeight: {
      name: 'max-height',
      description: 'Set the maximum height of the rectangle',
      control: {
        type: 'select',
      },
      options: ['none', ...sizeOptionsPercent],
      table: {
        category: 'Height',
      },
    },
    maxWidth: {
      name: 'max-width',
      description: 'Set the maximum width of the rectangle',
      control: {
        type: 'select',
      },
      options: ['none', ...sizeOptionsPercent],
      table: {
        category: 'Width',
      },
    },
    minHeight: {
      name: 'min-height',
      description: 'Set the minimum height of the rectangle',
      control: {
        type: 'select',
      },
      options: ['none', ...sizeOptionsPercent],
      table: {
        category: 'Height',
      },
    },
    minWidth: {
      name: 'min-width',
      description: 'Set the minimum width of the rectangle',
      control: {
        type: 'select',
      },
      options: ['none', ...sizeOptionsPercent],
      table: {
        category: 'Width',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

function renderSizing(args: Args) {
  const maximumHeight = args.maxHeight && args.maxHeight !== 'null' ? `mh-${args.maxHeight}` : '';
  const maximumWidth = args.maxWidth && args.maxWidth !== 'null' ? `mw-${args.maxWidth}` : '';
  const minimumHeight =
    args.minHeight && args.minHeight !== 'null' ? `min-h-${args.minHeight}` : '';
  const minimumWidth = args.minWidth && args.minWidth !== 'null' ? `min-w-${args.minWidth}` : '';
  const classes = `content h-${args.height} w-${args.width} ${maximumHeight} ${maximumWidth} ${minimumHeight} ${minimumWidth}`;

  return html`
    <div class="sizing-example">
      <div class="d-flex p-16 gap-16" style="height: 150px">
        <div class="flex-fill">
          <div class="${classes}"></div>
        </div>
      </div>
    </div>
  `;
}

export const SizesPercent: Story = {
  args: {
    width: '25',
    height: '100',
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
