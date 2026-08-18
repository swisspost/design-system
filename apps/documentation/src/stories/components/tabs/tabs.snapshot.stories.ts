import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './tabs.stories';
import { html } from 'lit';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
import { PALETTE_TEST_PALETTE_TYPES } from '@/shared/snapshots/palettes';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  parameters: {
    layout: 'fullscreen',
  },
};

type Story = StoryObj;

function renderPageTabsInContainer(
  containerClass: string,
  size: string | undefined,
  context: StoryContext,
) {
  return html`
    <div class="${containerClass}">
      <p class="mt-8">Container: ${containerClass || 'none'}</p>
      ${meta.render?.({ ...context.args, variant: 'Page Tabs', size, label: context.args.label ?? 'Page navigation' } as never, context as never)}
      <p>The quick brown fox jumps over the lazy dog.</p>
    </div>
  `;
}

function renderPageTabsInPalette(palette: string, scheme: string, context: StoryContext) {
  return html`
    <div class="palette palette-${palette}" id="page-tabs_${palette}_${scheme}">
      <p class="fw-bold" style="text-transform: capitalize">Palette: ${palette}</p>
      ${['large', 'small'].map(
        size => html`
          <p class="mt-16">Size: ${size}</p>
          ${['container', 'container-fluid', ''].map(containerClass =>
            renderPageTabsInContainer(containerClass, size, context),
          )}
        `,
      )}
    </div>
  `;
}

export const PageTabs: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      scheme => html`
        ${PALETTE_TEST_PALETTE_TYPES.map(palette =>
          renderPageTabsInPalette(palette, scheme, context),
        )}
      `,
    );
  },
};

function renderContentTabsInContainer(
  containerClass: string,
  size: string | undefined,
  context: StoryContext,
) {
  return html`
    <div class="${containerClass}">
      <p class="mt-8">Container: ${containerClass || 'none'}</p>
      ${bombArgs({
        variant: ['Content Tabs'],
        activeTab: [undefined, 'third'],
      }).map((args: Args) =>
        meta.render?.({ ...context.args, ...args, size } as never, context as never),
      )}
      <p>The quick brown fox jumps over the lazy dog.</p>
    </div>
  `;
}

export const ContentTabs: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        ${['large', 'small'].map(
          size => html`
            <p class="mt-16 fw-bold">Size: ${size}</p>
            ${['container', 'container-fluid', ''].map(containerClass =>
              renderContentTabsInContainer(containerClass, size, context),
            )}
          `,
        )}
      `,
    );
  },
};
