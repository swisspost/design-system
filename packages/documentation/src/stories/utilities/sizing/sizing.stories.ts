import type { Args, Meta, StoryObj, StoryContext } from '@storybook/web-components';
import { html } from 'lit';
import { BADGE } from '../../../../.storybook/constants';
import './sizing.styles.scss';
import scss from './sizing.module.scss';

export const SCSS_VARIABLES = scss;

const sizingOptions = ['auto', ...Object.keys(SCSS_VARIABLES)];

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
    maxHeight: 'null',
    maxWidth: 'null',
  },
  argTypes: {
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
      options: ['none', ...sizingOptions],
    },
    maxWidth: {
      name: 'max-width',
      description: 'Set the maximum width of the cube',
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
  const classes = `content h-${args.height} w-${args.width} ${
    args.maxHeight && args.maxHeight !== 'null' ? `mh-${args.maxHeight}` : ''
  } ${args.maxWidth && args.maxWidth !== 'null' ? `mw-${args.maxWidth}` : ''}`;

  return html`
    <div class="sizing-example">
      <div class="d-flex p-regular gap-regular" style="height: 150px">
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
