import type { StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './sizing.styles.scss';
import meta from './sizing.stories';
import { COLOR_SCHEMES, schemes } from '@/shared/snapshots/schemes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

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

const pxSamples = [
  { w: '12', h: '16', maxW: '32', minW: '12', maxH: '48', minH: '16' },
  { w: '24', h: '32', maxW: '32', minW: '12', maxH: '40', minH: '24' },
  { w: '40', h: '56', maxW: '48', minW: '24', maxH: '56', minH: '32' },
  { w: '64', h: '64', maxW: '80', minW: '56', maxH: '104', minH: '32' },
  { w: '104', h: '48', maxW: '104', minW: '40', maxH: '104', minH: '48' },
  { w: '64', h: '64', maxW: '80', minW: '32', maxH: '78', minH: '64' },
  { w: '12', h: '16', maxW: '16', minW: '12', maxH: '32', minH: '16' },
  { w: '32', h: '12', maxW: '40', minW: '24', maxH: '32', minH: '12' },
  { w: '78', h: '104', maxW: '80', minW: '40', maxH: '104', minH: '56' },
  { w: '48', h: '80', maxW: '104', minW: '48', maxH: '104', minH: '56' },
  { w: '80', h: '104', maxW: '104', minW: '64', maxH: '104', minH: '32' },
];

function generateClassNames(sample: Record<string, string>, isViewport = false) {
  const classes: string[] = ['content'];

  if (isViewport) {
    if (sample.w) classes.push(`vw-${sample.w}`);
    if (sample.h) classes.push(`vh-${sample.h}`);

    if (sample.minvW) classes.push(`min-vw-${sample.minvW}`);
    if (sample.maxvW) classes.push(`max-vw-${sample.maxvW}`);
    if (sample.minvH) classes.push(`min-vh-${sample.minvH}`);
    if (sample.maxvH) classes.push(`max-vh-${sample.maxvH}`);
  } else {
    if (sample.w) classes.push(`w-${sample.w}`);
    if (sample.h) classes.push(`h-${sample.h}`);

    if (sample.minW) classes.push(`min-w-${sample.minW}`);
    if (sample.maxW) classes.push(`max-w-${sample.maxW}`);
    if (sample.minH) classes.push(`min-h-${sample.minH}`);
    if (sample.maxH) classes.push(`max-h-${sample.maxH}`);
  }

  return classes.join(' ');
}

export const PercentageSizing: StoryObj = {
  render() {
    return schemes(
      () => {
        return html`
          ${samples.map(sample => {
            return html`<div class="sizing-example snapshot">
              <div class="${generateClassNames(sample)}"></div>
            </div>`;
          })}
        `;
      },
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    );
  },
};

export const PercentageVpSizing: StoryObj = {
  render() {
    return schemes(
      () => html`
        <div class="sizing-example">
          <div class="grid">
            ${samples.map(
              sample => html`
                <div class="grid-item snapshot">
                  <div class="${generateClassNames(sample, true)}"></div>
                </div>
              `,
            )}
          </div>
        </div>
      `,
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    );
  },
};

export const PixelSizing: StoryObj = {
  render() {
    return schemes(
      () => {
        return html`
          ${pxSamples.map(sample => {
            return html`<div class="sizing-px-example snapshot">
              <div class="${generateClassNames(sample)}"></div>
            </div>`;
          })}
        `;
      },
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    );
  },
};
