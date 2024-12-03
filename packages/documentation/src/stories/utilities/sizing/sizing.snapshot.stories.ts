import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sizing.styles.scss';
import meta from './sizing.stories';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const PercentageSizing: Story = {
  decorators: [(StoryFn: any) => html`<div class="sizing-example snapshot">${StoryFn()}</div>`],
  args: {
    width: 'full',
    height: 'full',
  },
  render: () => {
    const samples = [
      { w: 'third', h: 'full', maxW: 'third', minW: 'full', maxH: 'half', minH: 'two-thirds' },
      { w: 'quarter', h: 'half', maxW: 'quarter', minW: 'half', maxH: 'full', minH: 'quarter' },
      { w: 'half', h: 'quarter', maxW: 'half', minW: 'quarter', maxH: 'two-thirds', minH: 'third' },
      {
        w: 'three-quarters',
        h: 'quarter',
        maxW: 'three-quarters',
        minW: 'three-quarters',
        maxH: 'quarter',
        minH: 'half',
      },
      { w: 'full', h: 'half', maxW: 'full', minW: 'third', maxH: 'auto', minH: 'auto' },
    ];
    return html`
      <div class="sizing-example snapshot">
        ${samples.map(sample => {
          return html`
            <div class="grid-item">
              <div
                class="w-${sample.w} h-${sample.h} max-w-${sample.maxW} min-w-${sample.minW} max-h-${sample.maxH} min-h-${sample.minH}"
              ></div>
            </div>
          `;
        })}
      </div>
    `;
  },
};

export const PixelSizing: Story = {
  render: () => {
    const samples = [
      { w: 'third', h: 'full', maxW: 'third', minW: 'full', maxH: 'half', minH: 'two-thirds' },
      { w: 'quarter', h: 'half', maxW: 'quarter', minW: 'half', maxH: 'full', minH: 'quarter' },
      { w: 'half', h: 'quarter', maxW: 'half', minW: 'quarter', maxH: 'two-thirds', minH: 'third' },
      {
        w: 'three-quarters',
        h: 'quarter',
        maxW: 'three-quarters',
        minW: 'three-quarters',
        maxH: 'quarter',
        minH: 'half',
      },
      { w: 'full', h: 'half', maxW: 'full', minW: 'third', maxH: 'auto', minH: 'auto' },
    ];

    return html`
      <div class="sizing-example snapshot">
        ${samples.map(sample => {
          return html`
            <div class="grid-item">
              <div
                class="w-${sample.w} h-${sample.h} max-w-${sample.maxW} min-w-${sample.minW} max-h-${sample.maxH} min-h-${sample.minH}"
              ></div>
            </div>
          `;
        })}
      </div>
    `;
  },
};
