import type { Args, StoryContext, StoryObj } from '@storybook/web-components-vite';
import meta from './tabs.stories';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { schemes } from '@/shared/snapshots/schemes';
import { bombArgs } from '@/utils';
import { PALETTE_TEST_PALETTE_TYPES } from '@/shared/snapshots/palettes';
import { defaultNav } from '@root/src/stories/components/side-navigation/nav-content';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
  parameters: {
    layout: 'fullscreen',
  },
};

type Story = StoryObj;

function renderTabsInContainer(containerClass: string, content: unknown) {
  return html`
    <div class="${containerClass}">
      <p class="mt-8">Container: ${containerClass || 'none'}</p>
      ${content}
      <p>The quick brown fox jumps over the lazy dog.</p>
    </div>
  `;
}

function renderPageTabsInContainer(
  containerClass: string,
  size: string | undefined,
  context: StoryContext,
) {
  return renderTabsInContainer(
    containerClass,
    meta.render?.({ ...context.args, variant: 'Page Tabs', size, label: context.args.label ?? 'Page navigation' } as never, context as never),
  );
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
  return renderTabsInContainer(
    containerClass,
    bombArgs({
      variant: ['Content Tabs'],
      activeTab: [undefined, 'third'],
    }).map((args: Args) => meta.render?.({ ...context.args, ...args, size } as never, context as never)),
  );
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

function renderAppHeader(title: string) {
  return html`
    <post-header text-menu="Menu">
      <post-logo slot="post-logo" url="/">Homepage</post-logo>
      <p slot="title">${title}</p>
    </post-header>
  `;
}

function renderMainNavSidenav(id: string) {
  return html`
    <post-side-navigation size="large" id="${id}" text-close="Close">
      <nav aria-label="Main navigation">${unsafeHTML(defaultNav)}</nav>
    </post-side-navigation>
  `;
}

function renderPageNavTabs(nameSuffix: string, size?: 'large' | 'small') {
  return html`
    <post-tabs label="Page navigation" size=${ifDefined(size)}>
      <post-tab-item name="first${nameSuffix}">
        <a href="/first" aria-current="page">First page</a>
      </post-tab-item>
      <post-tab-item name="second${nameSuffix}"><a href="/second">Second page</a></post-tab-item>
      <post-tab-item name="third${nameSuffix}"><a href="/third">Third page</a></post-tab-item>
    </post-tabs>
  `;
}

function renderMainContainer(containerClass: 'container' | 'container-fluid', content: unknown) {
  return html`
    <main class="main-container">
      <div class="${containerClass} my-16">${content}</div>
    </main>
  `;
}

function renderPageTabsWithSidenav(containerClass: 'container' | 'container-fluid') {
  return html`
    <div
      style="position: relative; contain: layout; min-height: 700px; border: 1px solid var(--post-scheme-color-interactive-input-enabled-border, #ccc);"
    >
      ${renderAppHeader(`Container: ${containerClass}`)}

      ${renderMainNavSidenav(`sidenav_${containerClass}`)}

      ${renderMainContainer(
        containerClass,
        html`
          ${renderPageNavTabs('-large', 'large')}
          <p>The quick brown fox jumps over the lazy dog.</p>
        `,
      )}
    </div>
  `;
}

export const PageTabsWithSidenav: Story = {
  render: () => html`
    ${['container', 'container-fluid'].map(
      containerClass =>
        html`${renderPageTabsWithSidenav(containerClass as 'container' | 'container-fluid')}`,
    )}
  `,
};

// Tabs rendered alongside a post-side-navigation, for Cypress. Kept separate from
// PageTabsWithSidenav so a failure points at one specific container type.

function renderSingleTabsWithSidenav(containerClass: 'container' | 'container-fluid') {
  return html`
    ${renderAppHeader(`Container: ${containerClass}`)}

    ${renderMainNavSidenav(`sidenav_${containerClass}_single`)}
    ${renderMainContainer(containerClass, renderPageNavTabs(''))}
  `;
}

export const ContainerAndSidenav: Story = {
  render: () => renderSingleTabsWithSidenav('container'),
};

export const ContainerFluidAndSidenav: Story = {
  render: () => renderSingleTabsWithSidenav('container-fluid'),
};
