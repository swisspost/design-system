import { componentOnReady, nanoid, Required, Type, Url } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, Host, Prop, State, h } from '@stencil/core';
import { throttle } from 'throttle-debounce';
import type { HTMLStencilElement } from '@stencil/core/internal';

const MAX_VISIBLE_ITEMS = 6;
const MEASUREMENT_DEBOUNCE_MS = 50;

/**
 * @slot home - The content of the root (home) breadcrumb item. Can contain an `<a>` element, so consumers can slot their own routing-aware link (e.g. a Next.js `Link`) instead of relying on the `home-url` prop. Falls back to an internal link built from `home-url` and `text-home` when nothing is slotted.
 */
@Component({
  tag: 'post-breadcrumbs',
  styleUrl: 'post-breadcrumbs.scss',
  shadow: true,
})
export class PostBreadcrumbs {
  private debounceUpdateCollapsedItems = throttle(
    MEASUREMENT_DEBOUNCE_MS,
    this.updateCollapsedItems.bind(this),
  );

  private resizeObserver = new ResizeObserver(this.debounceUpdateCollapsedItems);
  private mutationObserver = new MutationObserver(this.updateHiddenNav.bind(this));

  @Element() host: HTMLPostBreadcrumbsElement;

  @State() id: string;
  @State() loaded = false;

  // Whether the consumer slotted their own <a> into the `home` slot. When true, `home-url` is not
  // required, since the internal fallback link is not rendered.
  @State() hasSlottedHomeAnchor = false;

  /** The number of breadcrumb items, counted from the start, that are moved into the overflow menu. */
  @State() collapsed = 0;

  /** The visible breadcrumb navigation. */
  private nav: HTMLElement | null = null;

  /** An off-screen copy of the breadcrumb navigation used for measurement. */
  private hiddenNav: HTMLElement | null = null;

  /**
   * The URL for the root (home) breadcrumb item. Ignored if an `<a>` element is slotted into the `home` slot.
   */
  @Prop({ reflect: true })
  @Required({ when: 'hasSlottedHomeAnchor', truthy: false })
  @Url()
  homeUrl?: string;

  /**
   * An accessible label for the root (home) breadcrumb item.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textHome!: string;

  /**
   * An accessible label for the breadcrumb navigation.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textBreadcrumbs!: string;

  /**
   * An accessible label for the overflow menu that contains collapsed breadcrumb items.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textMoreItems!: string;

  componentWillLoad() {
    this.id = this.host.id || `b${nanoid(6)}`;
    this.checkSlottedHomeAnchor();
  }

  async componentDidLoad() {
    this.resizeObserver?.observe(document.body);
    this.mutationObserver?.observe(this.host, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    await this.updateHiddenNav();
    await this.updateCollapsedItems();
    this.loaded = true;
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
    this.debounceUpdateCollapsedItems.cancel();
  }

  private checkSlottedHomeAnchor() {
    const homeSlotElement = Array.from(this.host.children).find(
      child => child.getAttribute('slot') === 'home',
    );
    this.hasSlottedHomeAnchor = homeSlotElement?.tagName === 'A';
  }

  /**
   * Measures the space available in the breadcrumb navigation and moves the items that do not fit
   * into the overflow menu.
   */
  private async updateCollapsedItems() {
    if (!this.nav) return;
    this.collapsed = await this.calculateCollapsedItems();
  }

  /**
   * Determines how many items have to be collapsed, either because they do not fit the breadcrumb
   * navigation or because they exceed the maximum number of visible items.
   */
  private async calculateCollapsedItems() {
    const items = this.host.querySelectorAll('post-breadcrumb-item');
    const overflowing = await this.calculateOverflowingItems();

    // Never show more than `MAX_VISIBLE_ITEMS`, even if the nav is wide enough to fit them all.
    return Math.max(overflowing, items.length - MAX_VISIBLE_ITEMS);
  }

  /**
   * Determines how many items overflow the width of the breadcrumb navigation.
   */
  private async calculateOverflowingItems() {
    // Fallback to zero if the hidden nav is not available for measurement.
    if (!this.hiddenNav) return 0;

    const gap = Number.parseFloat(getComputedStyle(this.hiddenNav.firstElementChild).gap);
    const menu = this.hiddenNav.querySelector<HTMLElement>('.menu').clientWidth;

    // The last item can never be collapsed, so it is ignored when measuring the width of the items.
    const items = Array.from(this.hiddenNav.querySelectorAll('post-breadcrumb-item')).slice(0, -1);

    // Start from the assumption that all items fit and that no menu is shown.
    // Therefore, subtract the width of the overflow menu.
    let width = this.hiddenNav.scrollWidth - menu + gap;
    let overflowing = 0;

    // Discard items from the start until the remaining ones fit the available width.
    while (overflowing < items.length && width > this.hiddenNav.clientWidth) {
      // The overflow menu needs to be displayed as soon as the first item is moved into it, so its
      // width needs to be taken into account when measuring the remaining items.
      if (overflowing === 0) width += menu;

      width -= items[overflowing++].clientWidth + gap;
    }

    return overflowing;
  }

  /**
   * Moves `collapsed` items into the overflow menu and marks the last item as selected.
   */
  private updateItems(items: NodeListOf<Element>, collapsed: number) {
    items.forEach((item, index) => {
      item.setAttribute('variant', index < collapsed ? 'menuitem' : 'listitem');
      item.setAttribute('selected', String(index === items.length - 1));
      item.setAttribute('standalone', String(index === items.length - 1 && index === collapsed));
    });
  }

  /**
   * Rebuilds the off-screen copy of the breadcrumb navigation.
   */
  private async updateHiddenNav() {
    this.hiddenNav?.remove();
    this.hiddenNav = await this.renderHiddenNav();
  }

  /**
   * Renders an off-screen copy of the breadcrumb navigation that is used for measurements.
   */
  private async renderHiddenNav() {
    const shadowRoot = this.host.shadowRoot;
    if (!shadowRoot || !this.nav) return null;

    const clone = this.nav.cloneNode(true) as HTMLElement;
    const slots = clone.querySelectorAll('slot');

    // Deep clone the breadcrumb navigation and flatten its slots into the clone.
    this.nav.querySelectorAll('slot').forEach((source, index) => {
      const target = slots[index];
      const assignedElements = source.assignedElements();

      if (assignedElements.length > 0) {
        // Insert the assigned elements where the slot used to be, then drop the now empty slot.
        assignedElements.forEach(element => {
          target.insertAdjacentElement('beforebegin', element.cloneNode(true) as Element);
        });
        target.remove();
      } else {
        // Nothing assigned: keep the slot's own fallback content (e.g. the default home link) by
        // unwrapping the <slot> in place, instead of removing it along with its children.
        target.replaceWith(...Array.from(target.childNodes));
      }
    });

    clone.classList.remove('loading');
    clone.classList.add('invisible');

    // Show the overflow menu so that we can include the space it takes up in the measurement.
    clone.querySelector('.menu').classList.remove('empty');
    shadowRoot.append(clone);

    // Wait for all items to be fully hydrated before measuring.
    const items = clone.querySelectorAll<HTMLStencilElement>('post-breadcrumb-item');
    await Promise.all(Array.from(items).map(item => componentOnReady(item)));

    // Move the items out of the overflow menu so that the uncollapsed layout can be measured.
    this.updateItems(items, 0);

    return clone;
  }

  private renderMenu() {
    const menuId = `${this.id}-menu`;

    return (
      <div class={`breadcrumb-item menu ${this.collapsed === 0 ? 'empty' : ''}`} role="listitem">
        <post-menu-trigger for={menuId}>
          <button>
            <span class="visually-hidden">{this.textMoreItems}</span>
            <span aria-hidden="true">...</span>
          </button>
        </post-menu-trigger>
        <post-menu id={menuId} label={this.textMoreItems} placement="bottom-start">
          <slot name="menu" />
        </post-menu>
      </div>
    );
  }

  render() {
    if (this.loaded) {
      const items = this.host.querySelectorAll('post-breadcrumb-item');
      this.updateItems(items, this.collapsed);
    }

    return (
      <Host data-version={version}>
        <nav
          aria-label={this.textBreadcrumbs}
          ref={el => (this.nav = el)}
          class={this.loaded ? '' : 'loading'}
        >
          <div role="list">
            <div class="breadcrumb-item home" role="listitem">
              <slot name="home" onSlotchange={() => this.checkSlottedHomeAnchor()}>
                <a href={this.homeUrl}>
                  <span class="visually-hidden">{this.textHome}</span>
                  <post-icon aria-hidden="true" name="home" />
                </a>
              </slot>
            </div>
            {this.renderMenu()}
            <slot />
            <slot name="selected" />
          </div>
        </nav>
      </Host>
    );
  }
}
