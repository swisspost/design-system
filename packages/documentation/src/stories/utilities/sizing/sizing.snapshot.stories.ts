import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sizing.styles.scss';
import meta from './sizing.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  argTypes: {
    // ... your argTypes here
  },
};

type Story = StoryObj;

export const Sizing: Story = {
  render: () => {
    const nonViewportSamples = [
      { w: '0', h: '100', maxW: '0', minW: '100', maxH: '50', minH: '0' },
      { w: '25', h: '50', maxW: '25', minW: '50', maxH: '100', minH: '25' },
      { w: '50', h: '25', maxW: '50', minW: '25', maxH: '75', minH: '0' },
      { w: '75', h: '75', maxW: '75', minW: '75', maxH: '25', minH: '50' },
      { w: '100', h: '0', maxW: '100', minW: '0', maxH: '100', minH: '0' },
    ];

    const viewportSamples = [
      { vw: '0', vh: '100', maxVw: 'none', minVw: '100', maxVh: '50', minVh: '0' },
      { vw: '25', vh: '50', maxVw: 'none', minVw: '50', maxVh: '100', minVh: '25' },
      { vw: '50', vh: '25', maxVw: 'none', minVw: '25', maxVh: '75', minVh: '0' },
      { vw: '75', vh: '75', maxVw: 'none', minVw: '75', maxVh: '25', minVh: '50' },
      { vw: '100', vh: '100', maxVw: 'none', minVw: '0', maxVh: '100', minVh: '0' },
    ];

    return html`
      <div class="sizing-example snapshot">
        ${nonViewportSamples.map((sample, index) => {
          return html`
            <div class="grid-item">
              <div
                class="w-${sample.w} h-${sample.h} max-w-${sample.maxW} min-w-${sample.minW} max-h-${sample.maxH} min-h-${sample.minH}"
              ></div>
            </div>
          `;
        })}
      </div>

      <div class="sizing-vp-example snapshot">
        ${viewportSamples.map((sample, index) => {
          return html`
            <div class="grid-item">
              <div
                class="vw-${sample.vw} vh-${sample.vh} max-vw-${sample.maxVw} min-vw-${sample.minVw} max-vh-${sample.maxVh} min-vh-${sample.minVh}"
              ></div>
            </div>
          `;
        })}
      </div>
    `;
  },
};
