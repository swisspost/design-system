import type { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sizing.styles.scss';
import scss from './sizing.module.scss';
import { MetaExtended } from '@root/types';


export const SCSS_VARIABLES = scss;


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
    },
    width: {
      name: 'width',
      description: 'Set the width of the rectangle',
      control: {
        type: 'select',
      },
      options: sizeOptionsPercent,
    },
    maxHeight: {
      name: 'max-height',
      description: 'Set the maximum height of the rectangle',
      control: {
        type: 'select',
      },
      options: ['none', ...sizeOptionsPercent],
    },
    maxWidth: {
      name: 'max-width',
      description: 'Set the maximum width of the rectangle',
      control: {
        type: 'select',
      },
      options: ['none', ...sizeOptionsPercent],
    },
    minHeight: {
      name: 'min-height',
      description: 'Set the minimum height of the rectangle',
      control: {
        type: 'select',
      },
      options: ['none', ...sizeOptionsPercent],
    },
    minWidth: {
      name: 'min-width',
      description: 'Set the minimum width of the rectangle',
      control: {
        type: 'select',
      },
      options: ['none', ...sizeOptionsPercent],
    },
  },
};

export default meta;

type Story = StoryObj;

function renderSizing(args: Args) {
  const maximumHeight = args.maxHeight && args.maxHeight !== 'null' ? `mh-${args.maxHeight}` : '';
  const maximumWidth = args.maxWidth && args.maxWidth !== 'null' ? `mw-${args.maxWidth}` : '';
  const minimumHeight = args.minHeight && args.minHeight !== 'null' ? `min-h-${args.minHeight}` : '';
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


export const Sizing: Story = {

  render: (args: Args) => {
    const samples = [
      ['0', '100', '0', '100'],
      ['25', '50', '25', '50'],
      ['50', '25', '50', '25'],
      ['75', '75', '75', '75'],
      ['100', '0', '100', '0']
    ];

    // used only for the snapshots
    return html`
      ${samples.map(([w, wMd, h, hXl]) => {
      return html`
          <div class="grid-item">
            <div class="w-${w} w-md-${wMd} h-${h} h-xl-${hXl}">
            </div>
          </div>
          `;
    })}
    `;
  }
}


export const SizingVp: Story = {

  render: (args: Args) => {
    const samples = [
      ['0', '100', '0', '100'],
      ['25', '50', '25', '50'],
      ['50', '25', '50', '25'],
      ['75', '75', '75', '75'],
      ['100', '0', '100', '0']
    ];

    // used only for the snapshots
    return html`
      ${samples.map(([vw, vwMd, vh, vhXl]) => {
      return html`
          <div class="grid-item">
            <div class="vw-${vw} vw-md-${vwMd} vh-${vh} vh-xl-${vhXl}">
            </div>
          </div>
          `;
    })}
    `;
  }
}



export const SizingAuto: Story = {

  render: (args: Args) => {
    const samples = [
      ['100', 'auto', '50', '100'],
      ['auto', '100', 'auto', '50'],
      ['auto', 'auto', 'auto', 'auto'],
      ['50', 'auto', 'auto', 'auto']
    ];

    // used only for the snapshots
    return html`
      ${samples.map(([w, wMd, h, hXl]) => {
      return html`
          <div class="grid-item">
            <div class="w-${w} w-md-${wMd} h-${h} h-xl-${hXl}">
            <div class="inner-div">
            </div>
          </div>
          `;
    })}
    `;
  }
}