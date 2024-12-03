import type { Args, StoryObj, StoryFn, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import sizing from './sizing.module.scss';
import { parse } from '@/utils/sass-export';
import { MetaExtended } from '@root/types';
import './sizing.styles.scss';

const sizes: any = parse(sizing);
const percentageSizes = Object.keys(sizes.pcsizes);
const pixelSizes = Object.keys(sizes.pxsizes);

const meta: MetaExtended = {
  render: renderSizing,
  id: 'e728de1f-0d71-4317-8bb8-cbef0bf8d5db',
  title: 'Utilities/Sizing',
  parameters: {
    badges: [],
  },
  args: {
    height: 'none',
    width: 'none',
    maxHeight: 'none',
    maxWidth: 'none',
    minHeight: 'none',
    minWidth: 'none',
  },
  argTypes: {
    height: {
      name: 'height',
      description: 'Set the height of the rectangle',
      control: {
        type: 'select',
      },
      options: percentageSizes,
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
      options: percentageSizes,
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
      options: ['none', ...percentageSizes.filter(value => value !== 'auto')],
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
      options: ['none', ...percentageSizes.filter(value => value !== 'auto')],
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
      options: ['none', ...percentageSizes.filter(value => value !== 'auto')],
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
      options: ['none', ...percentageSizes.filter(value => value !== 'auto')],
      table: {
        category: 'Width',
      },
    },
  },
  decorators: [
    (story: StoryFn, context: StoryContext) => {
      const storyTemplate = html`
        <div class="sizing-example">
          <div class="d-flex p-16 gap-16" style="height: 150px">
            <div class="flex-fill">${story(context.args, context)}</div>
          </div>
        </div>
      `;
      return storyTemplate;
    },
  ],
};

export default meta;

type Story = StoryObj;

function renderSizing(args: Args) {
  const classNames = [
    `content`,
    `h-${args.height}`,
    `w-${args.width}`,
    args.maxHeight && args.maxHeight !== 'none' ? `max-h-${args.maxHeight}` : '',
    args.maxWidth && args.maxWidth !== 'none' ? `max-w-${args.maxWidth}` : '',
    args.minHeight && args.minHeight !== 'none' ? `min-h-${args.minHeight}` : '',
    args.minWidth && args.minWidth !== 'none' ? `min-w-${args.minWidth}` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return html`<div class="${classNames}"></div>`;
}

export const SizesPercent: Story = {
  args: {
    width: 'quarter',
    height: 'full',
  },
};

export const PxSizes: Story = {
  args: {
    width: '100',
    height: '80',
  },
  argTypes: {
    height: {
      name: 'height',
      description: 'Set the height of the rectangle',
      control: {
        type: 'select',
      },
      options: pixelSizes,
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
      options: pixelSizes,
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
      options: ['none', ...pixelSizes],
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
      options: ['none', ...pixelSizes],
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
      options: ['none', ...pixelSizes],
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
      options: ['none', ...pixelSizes],
      table: {
        category: 'Width',
      },
    },
  },
};
