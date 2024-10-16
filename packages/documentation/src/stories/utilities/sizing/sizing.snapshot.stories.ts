import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import './sizing.styles.scss';
import meta from './sizing.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;
export const Sizing: Story = {
  render: (_, context: StoryContext) => {
    const samples = [
      ['0', '100', '0', '100'],
      ['25', '50', '25', '50'],
      ['50', '25', '50', '25'],
      ['75', '75', '75', '75'],
      ['100', '0', '100', '0'],
    ];

    return html`
      <div class="sizing-example snapshot">
        <!-- Rendering the grid items with their width and height classes -->
        ${samples.map(([w, wMd, h, hXl]) => {
          return html`
            <div class="grid-item">
              <div class="w-${w} w-md-${wMd} h-${h} h-xl-${hXl}"></div>
            </div>
          `;
        })}
      </div>
    `;
  },
};

export const SizingVp: Story = {
  render: (_, context: StoryContext) => {
    const samples = [
      ['0', '100', '0', '100'],
      ['25', '50', '25', '50'],
      ['50', '25', '50', '25'],
      ['75', '75', '75', '75'],
      ['100', '0', '100', '0'],
    ];

    return html`
      <div class="sizing-vp-example snapshot">
        <!-- Rendering the viewport width and height classes -->
        ${samples.map(([vw, vwMd, vh, vhXl]) => {
          return html`
            <div class="grid-item">
              <div class="vw-${vw} vw-md-${vwMd} vh-${vh} vh-xl-${vhXl}"></div>
            </div>
          `;
        })}
      </div>
    `;
  },
};

export const SizingAuto: Story = {
  render: (_, context: StoryContext) => {
    const samples = [
      ['100', 'auto', '50', '100'],
      ['auto', '100', 'auto', '50'],
      ['auto', 'auto', 'auto', 'auto'],
      ['50', 'auto', 'auto', 'auto'],
    ];

    return html`
      <div class="sizing-auto-example snapshot">
        <!-- Rendering the viewport width and height classes -->
        ${samples.map(([w, wMd, h, hXl]) => {
          return html`
            <div class="grid-item">
              <div class="w-${w} w-md-${wMd} h-${h} h-xl-${hXl}">
                <div class="inner-div"></div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  },
};
