import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sizing.styles.scss';
import scss from './sizing.module.scss';
import { MetaExtended } from '@root/types';

export const SCSS_VARIABLES = scss;

const sizingOptions = ['auto', ...Object.keys(SCSS_VARIABLES)];

const sizeOptionsPercent = ['auto', '25', '50', '75', '100'];

const meta: MetaExtended = {
  render: renderSizing,
  id: 'e728de1f-0d71-4317-8bb8-cbef0bf8d5db',
  title: 'Utilities/Sizing',
  parameters: {
    badges: [],
  },
  args: {
    height: 'bigger-giant',
    width: 'bigger-giant',
    maxHeight: 'null',
    maxWidth: 'null',
  },
  argTypes: {
    height: {
      name: 'height',
      description: 'Set the height of the rectangle',
      control: {
        type: 'select',
      },
      options: sizingOptions,
    },
    width: {
      name: 'width',
      description: 'Set the width of the rectangle',
      control: {
        type: 'select',
      },
      options: sizingOptions,
    },
    maxHeight: {
      name: 'max-height',
      description: 'Set the maximum height of the rectangle',
      control: {
        type: 'select',
      },
      options: ['none', ...sizingOptions],
    },
    maxWidth: {
      name: 'max-width',
      description: 'Set the maximum width of the rectangle',
      control: {
        type: 'select',
      },
      options: ['none', ...sizingOptions],
    },
  },
};

export default meta;

type Story = StoryObj;

function renderSizing(args: Args) {
  const maximumHeight = args.maxHeight && args.maxHeight !== 'null' ? `mh-${args.maxHeight}` : '';
  const maximumWidth = args.maxWidth && args.maxWidth !== 'null' ? `mw-${args.maxWidth}` : '';
  const classes = `content h-${args.height} w-${args.width} ${maximumHeight} ${maximumWidth}`;

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

export const Sizes: Story = {};
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
