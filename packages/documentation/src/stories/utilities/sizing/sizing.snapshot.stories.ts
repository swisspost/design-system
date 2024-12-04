import type { StoryObj } from '@storybook/web-components';
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

const vpSamples = [
  { w: '33', h: '100', maxvW: '33', minvW: '100', maxvH: '50', minvH: '66' },
  { w: '50', h: '50', maxvW: '25', minvW: '50', maxvH: '100', minvH: '25' },
  { w: '50', h: '25', maxvW: '50', minvW: '25', maxvH: '66', minvH: '33' },
  {
    w: '75',
    h: '25',
    maxvW: '75',
    minvW: '25',
    maxvH: '50',
    minvH: '25',
  },
  { w: '100', h: '50', maxvW: '100', minvW: '33', maxvH: 'auto', minvH: 'auto' },
];

const pxSamples = [
  { w: '12', h: '18', maxW: '33', minW: '12', maxH: '48', minH: '22' },
  { w: '24', h: '36', maxW: '32', minW: '20', maxH: '40', minH: '24' },
  { w: '40', h: '56', maxW: '48', minW: '24', maxH: '56', minH: '32' },
  { w: '28', h: '64', maxW: '80', minW: '56', maxH: '96', minH: '36' },
  { w: '96', h: '48', maxW: '100', minW: '40', maxH: '112', minH: '48' },
  { w: '64', h: '56', maxW: '80', minW: '32', maxH: '78', minH: '64' },
  { w: '20', h: '15', maxW: '22', minW: '12', maxH: '32', minH: '18' },
  { w: '32', h: '22', maxW: '40', minW: '24', maxH: '36', minH: '20' },
  { w: '78', h: '96', maxW: '80', minW: '40', maxH: '112', minH: '56' },
  { w: '48', h: '80', maxW: '96', minW: '50', maxH: '112', minH: '56' },
  { w: '80', h: '96', maxW: '112', minW: '64', maxH: '100', minH: '36' },
];
function generateClassNames(sample: Record<string, string>, isViewport = false) {
  const prefix = isViewport ? 'v' : '';

  const classNames = ['content'];

  classNames.push(`${prefix}h-${sample.h}`);
  classNames.push(`${prefix}w-${sample.w}`);

  if (sample[`max${prefix}H`] && sample[`max${prefix}H`] !== 'none') {
    classNames.push(`max-vh-${sample[`max${prefix}H`]}`);
  }

  if (sample[`max${prefix}W`] && sample[`max${prefix}W`] !== 'none') {
    classNames.push(`max-vw-${sample[`max${prefix}W`]}`);
  }

  if (sample[`min${prefix}H`] && sample[`min${prefix}H`] !== 'none') {
    classNames.push(`min-vh-${sample[`min${prefix}H`]}`);
  }

  if (sample[`min${prefix}W`] && sample[`min${prefix}W`] !== 'none') {
    classNames.push(`min-vw-${sample[`min${prefix}W`]}`);
  }

  return classNames.filter(Boolean).join(' ');
}

export const PercentageSizing: StoryObj = {
  render() {
    return schemes(
      () => {
        const samplesTemplates = samples.map(sample => {
          return html`<div class="sizing-example snapshot">
            <div class="${generateClassNames(sample)}"></div>
          </div>`;
        });

        return html`${samplesTemplates}`;
      },
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    );
  },
};

export const PercentageVpSizing: StoryObj = {
  render() {
    return schemes(
      () => {
        return html`
          <div class="grid">
            ${vpSamples.map(sample => {
              return html`
                <div class="grid-item">
                  <div class="sizing-example snapshot">
                    <div class="${generateClassNames(sample, true)}"></div>
                  </div>
                </div>
              `;
            })}
          </div>
        `;
      },
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    );
  },
};

export const PixelSizing: StoryObj = {
  render() {
    return schemes(
      () => {
        const samplesTemplates = pxSamples.map(sample => {
          return html`<div class="sizing-px-example snapshot">
            <div class="${generateClassNames(sample)}"></div>
          </div>`;
        });

        return html`${samplesTemplates}`;
      },
      { filter: scheme => scheme === COLOR_SCHEMES.light },
    );
  },
};
