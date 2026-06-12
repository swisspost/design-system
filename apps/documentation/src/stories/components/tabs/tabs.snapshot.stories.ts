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

function renderPageTabsInContainer(containerClass: string, context: StoryContext) {
  return html`
    <div class="${containerClass}">
      ${bombArgs({ fullWidth: [false, true] })
        .filter(args => !(containerClass === '' && args.fullWidth === true))
        .map((args: Args) =>
          meta.render?.(
            { ...context.args, ...args, variant: 'Page Tabs' } as never,
            context as never,
          ),
        )}
    </div>
  `;
}

function renderPageTabsInPalette(palette: string, scheme: string, context: StoryContext) {
  return html`
    <div class="palette palette-${palette} p-32" id="page-tabs_${palette}_${scheme}">
      <p class="fw-bold" style="text-transform: capitalize">Palette: ${palette}</p>
      ${['container', 'container-fluid', ''].map(containerClass =>
        renderPageTabsInContainer(containerClass, context),
      )}
    </div>
  `;
}

export const PageTabs: Story = {
  render: (_args: Args, context: StoryContext) => {
    return html`
      <div class="row row-cols-2 g-0">
        ${schemes(
          scheme => html`
            <div class="px-8">
              ${PALETTE_TEST_PALETTE_TYPES.map(palette =>
                renderPageTabsInPalette(palette, scheme, context),
              )}
            </div>
          `,
        )}
      </div>
    `;
  },
};

function renderContentTabsInContainer(containerClass: string, context: StoryContext) {
  return html`
    <div class="${containerClass}">
      ${bombArgs({
        variant: ['Content Tabs'],
        activeTabPanels: [undefined, 'third'],
        fullWidth: [false, true],
      })
        .filter(args => !(containerClass === '' && args.fullWidth === true))
        .map((args: Args) =>
          meta.render?.({ ...context.args, ...args } as never, context as never),
        )}
    </div>
  `;
}

export const ContentTabs: Story = {
  render: (_args: Args, context: StoryContext) => {
    return schemes(
      () => html`
        ${['container', 'container-fluid', ''].map(containerClass =>
          renderContentTabsInContainer(containerClass, context),
        )}
      `,
    );
  },
};
