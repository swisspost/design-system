import type { StoryContext, StoryObj, Args } from '@storybook/web-components-vite';
import { html, TemplateResult } from 'lit';
import './sizing.styles.scss';
import meta from './sizing.stories';
import { COLOR_SCHEMES, schemes } from '@/shared/snapshots/schemes';
const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

const TOKENS = ['quarter', 'third', 'half', 'two-thirds', 'three-quarters', 'full'];
const PIXEL_TOKENS = ['12', '16', '24', '32', '40', '48', '56', '64', '78', '80', '104'];
const BASE_VW = 'vw-half';
const BASE_VH = 'vh-half';

const BASE: Args = {
  height: 'half',
  width: 'half',
  maxHeight: 'none',
  maxWidth: 'none',
  minHeight: 'none',
  minWidth: 'none',
};
const BASE_PX: Args = {
  height: '64',
  width: '64',
  maxHeight: 'none',
  maxWidth: 'none',
  minHeight: 'none',
  minWidth: 'none',
};

const listFrom = (key: keyof Args, values: string[], base: Args): Array<Args> =>
  values.map(v => ({ ...base, [key]: v }));

export const PercentageSizing: Story = {
  name: 'Sizing (Percent Catalogue)',
  render: (_: Args, context: StoryContext) => {
    const H_ONLY = listFrom('height', TOKENS, BASE);
    const W_ONLY = listFrom('width', TOKENS, BASE);
    const MAX_H = listFrom('maxHeight', TOKENS, BASE);
    const MAX_W = listFrom('maxWidth', TOKENS, BASE);
    const MIN_H = listFrom('minHeight', TOKENS, BASE);
    const MIN_W = listFrom('minWidth', TOKENS, BASE);

    return schemes(
      () => html`
        <div class="snapshot-example">
          <h1>Snapshot: Sizing (Percent)</h1>
          ${renderSection('height (h-*)', H_ONLY, context)}
          ${renderSection('width (w-*)', W_ONLY, context)}
          ${renderSection('max-height (max-h-*)', MAX_H, context)}
          ${renderSection('max-width (max-w-*)', MAX_W, context)}
          ${renderSection('min-height (min-h-*)', MIN_H, context)}
          ${renderSection('min-width (min-w-*)', MIN_W, context)}
        </div>
      `,
      { filter: s => s === COLOR_SCHEMES.light },
    );
  },
};

export const PixelSizing: Story = {
  name: 'Sizing (Pixels Catalogue)',
  render: (_: Args, context: StoryContext) => {
    const H_ONLY = listFrom('height', PIXEL_TOKENS, BASE_PX);
    const W_ONLY = listFrom('width', PIXEL_TOKENS, BASE_PX);
    const MAX_H = listFrom('maxHeight', PIXEL_TOKENS, BASE_PX);
    const MAX_W = listFrom('maxWidth', PIXEL_TOKENS, BASE_PX);
    const MIN_H = listFrom('minHeight', PIXEL_TOKENS, BASE_PX);
    const MIN_W = listFrom('minWidth', PIXEL_TOKENS, BASE_PX);

    return schemes(
      () => html`
        <div class="snapshot-example">
          <h1>Snapshot: Sizing (Pixels)</h1>
          ${renderSection('height (h-*)', H_ONLY, context)}
          ${renderSection('width (w-*)', W_ONLY, context)}
          ${renderSection('max-height (max-h-*)', MAX_H, context)}
          ${renderSection('max-width (max-w-*)', MAX_W, context)}
          ${renderSection('min-height (min-h-*)', MIN_H, context)}
          ${renderSection('min-width (min-w-*)', MIN_W, context)}
        </div>
      `,
      { filter: s => s === COLOR_SCHEMES.light },
    );
  },
};

const renderSection = (
  title: string,
  items: Array<Args>,
  context: StoryContext,
): TemplateResult => html`
  <h2>${title}</h2>
  <div class="d-flex  flex-wrap">
    ${items.map(
      (args: Args) => html`
        <div class="sizing-example snapshot">
          ${meta.render?.({ ...context.args, ...args }, context)}
        </div>
      `,
    )}
  </div>
`;

export const PercentageVpSizing: Story = {
  name: 'Sizing (Viewport vh/vw + max/min)',
  render: () => {
    const VH_ONLY = TOKENS.map(t => ['content', `vh-${t}`, BASE_VW].join(' '));
    const VW_ONLY = TOKENS.map(t => ['content', `vw-${t}`, BASE_VH].join(' '));
    const MAX_VH = TOKENS.map(t => ['content', `max-vh-${t}`, BASE_VW].join(' '));
    const MAX_VW = TOKENS.map(t => ['content', `max-vw-${t}`, BASE_VH].join(' '));
    const MIN_VH = TOKENS.map(t => ['content', `min-vh-${t}`, BASE_VW].join(' '));
    const MIN_VW = TOKENS.map(t => ['content', `min-vw-${t}`, BASE_VH].join(' '));

    return schemes(
      () => html`
        <div class="snapshot-example">
          <h1>Snapshot: Sizing (Viewport)</h1>
          ${renderViewportTokensSection('vh-*', VH_ONLY)}
          ${renderViewportTokensSection('vw-*', VW_ONLY)}
          ${renderViewportTokensSection('max-vh-*', MAX_VH)}
          ${renderViewportTokensSection('max-vw-*', MAX_VW)}
          ${renderViewportTokensSection('min-vh-*', MIN_VH)}
          ${renderViewportTokensSection('min-vw-*', MIN_VW)}
        </div>
      `,
      { filter: s => s === COLOR_SCHEMES.light },
    );
  },
};

const renderViewportTokensSection = (title: string, classBlocks: string[]) => {
  return html`
    <h2>${title}</h2>
    ${classBlocks.map(cls => html`<div class="${cls}"></div>`)}
  `;
};
