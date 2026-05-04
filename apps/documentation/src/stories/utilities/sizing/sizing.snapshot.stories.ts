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
const PIXEL_TOKENS = ['12', '16', '24', '32', '40', '48', '56', '64', '72', '80', '96', '104'];

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
const BASE_FOR_MAX_WIDTH: Args = { ...BASE, width: 'full' };
const BASE_FOR_MIN_WIDTH: Args = { ...BASE, width: '0' };
const BASE_FOR_MAX_HEIGHT: Args = { ...BASE, height: 'full' };
const BASE_FOR_MIN_HEIGHT: Args = { ...BASE, height: '0' };
const BASE_PX_FOR_MAX_WIDTH: Args = { ...BASE_PX, width: '104' };
const BASE_PX_FOR_MIN_WIDTH: Args = { ...BASE_PX, width: '1' };

const BASE_PX_FOR_MAX_HEIGHT: Args = { ...BASE_PX, height: '104' };
const BASE_PX_FOR_MIN_HEIGHT: Args = { ...BASE_PX, height: '1' };

const listFrom = (key: keyof Args, values: string[], base: Args): Array<Args> =>
  values.map(v => ({ ...base, [key]: v }));

export const PercentageSizing: Story = {
  name: 'Sizing (Percent Catalogue)',
  render: (_: Args, context: StoryContext) => {
    const H_ONLY = listFrom('height', TOKENS, BASE);
    const W_ONLY = listFrom('width', TOKENS, BASE);
    const MAX_H = listFrom('maxHeight', TOKENS, BASE_FOR_MAX_HEIGHT);
    const MAX_W = listFrom('maxWidth', TOKENS, BASE_FOR_MAX_WIDTH);
    const MIN_H = listFrom('minHeight', TOKENS, BASE_FOR_MIN_HEIGHT);
    const MIN_W = listFrom('minWidth', TOKENS, BASE_FOR_MIN_WIDTH);

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
    const MAX_H = listFrom('maxHeight', PIXEL_TOKENS, BASE_PX_FOR_MAX_HEIGHT);
    const MAX_W = listFrom('maxWidth', PIXEL_TOKENS, BASE_PX_FOR_MAX_WIDTH);
    const MIN_H = listFrom('minHeight', PIXEL_TOKENS, BASE_PX_FOR_MIN_HEIGHT);
    const MIN_W = listFrom('minWidth', PIXEL_TOKENS, BASE_PX_FOR_MIN_WIDTH);

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
  <div class="d-flex flex-wrap">
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
    const VH_ONLY = TOKENS.map(t => ['content', `vh-${t}`, 'vw-half'].join(' '));
    const VW_ONLY = TOKENS.map(t => ['content', `vw-${t}`, 'vh-half'].join(' '));
    const MAX_VH = TOKENS.map(t => ({
      token: t,
      classes: ['content', 'vw-half', `max-vh-${t}`].join(' '),
      style: 'height: 100vh;',
    }));
    const MAX_VW = TOKENS.map(t => ({
      token: t,
      classes: ['content', 'vh-half', `max-vw-${t}`].join(' '),
      style: 'width: 100vw;',
    }));
    const MIN_VH = TOKENS.map(t => ({
      token: t,
      classes: ['content', 'vw-half', `min-vh-${t}`].join(' '),
      style: 'height: 1px;',
    }));

    const MIN_VW = TOKENS.map(t => ({
      token: t,
      classes: ['content', 'vh-half', `min-vw-${t}`].join(' '),
      style: 'width: 1px;',
    }));

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

const renderViewportTokensSection = (
  title: string,
  items: Array<string | { token: string; classes: string; style: string }>,
) => {
  return html`
    <h2>${title}</h2>
    <div class="d-flex gap-1 flex-wrap">
      ${items.map(item => {
        if (typeof item === 'string') {
          return html` <div class="${item}"></div> `;
        }
        return html` <div class="${item.classes}" style="${item.style}"></div> `;
      })}
    </div>
  `;
};
