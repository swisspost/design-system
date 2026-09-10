import { componentOnReady, nanoid, Required, Type, Url } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, Host, Prop, State, h } from '@stencil/core';
import { throttle } from 'throttle-debounce';
import type { HTMLStencilElement } from '@stencil/core/internal';

const MAX_VISIBLE_ITEMS = 6;
const MEASUREMENT_DEBOUNCE_MS = 50;

/**
 * @slot home - The content of the root (home) breadcrumb item. Can contain an `<a>` element, so consumers can slot their own routing-aware link instead of relying on the `home-url` prop.
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

  /** Whether the consumer slotted their own `<a>` into the `home` slot. When true, `home-url` is not required, since the internal fallback link is not rendered. */
  @State() hasSlottedHomeAnchor = false;

  /** The number of breadcrumb items, counted from the start, that are moved into the overflow menu. */
  @State() collapsed = 0;

  /**
   * Whether the home item is collapsed into its own overflow menu because there is no space left
   * for it, even after every middle item has already been collapsed and the last (selected) item
   * has wrapped onto multiple lines. This is the last resort: the home item never shrinks or
   * truncates, it only ever renders in full or swaps entirely into this menu.
   */
  @State() homeCollapsed = false;

  /** The visible breadcrumb navigation. */
  private nav: HTMLElement | null = null;

  /** An off-screen copy of the breadcrumb navigation used for measurement. */
  private hiddenNav: HTMLElement | null = null;

  /**
   * The URL for the root (home) breadcrumb item.
   */
  @Prop({ reflect: true })
  @Required({ when: 'hasSlottedHomeAnchor', truthy: false })
  @Url()
  homeUrl?: string;

  /**
   * The label of the root (home) breadcrumb item. Displayed visibly when `home-text` is `true`,
   * otherwise used as an accessible label alongside the home icon.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textHome!: string;

  /**
   * Whether `text-home` is displayed visibly instead of the home icon, enabling segment specific
   * breadcrumbs (like "Private customers" or "About us").
   */
  @Prop({ reflect: true })
  @Required()
  @Type('boolean')
  homeText = false;

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

  /**
   * An accessible label for the overflow menu that contains the home item, shown only once there
   * is no room left for the home item even after every middle item has been collapsed and the
   * last (selected) item has wrapped onto multiple lines.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textExpandHome!: string;

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
   * into the overflow menu, then checks whether the home item still overflows even after that.
   */
  private async updateCollapsedItems() {
    if (!this.nav) return;
    const { overflowing, homeOverflows } = await this.calculateCollapsedItems();
    this.collapsed = overflowing;
    this.homeCollapsed = homeOverflows;
  }

  /**
   * Determines how many items have to be collapsed, either because they do not fit the breadcrumb
   * navigation or because they exceed the maximum number of visible items, and whether the home
   * item overflows even once every middle item is collapsed.
   */
  private async calculateCollapsedItems() {
    const items = this.host.querySelectorAll('post-breadcrumb-item');
    const { overflowing, homeOverflows } = await this.calculateOverflowingItems();

    // Never show more than `MAX_VISIBLE_ITEMS`, even if the nav is wide enough to fit them all.
    return {
      overflowing: Math.max(overflowing, items.length - MAX_VISIBLE_ITEMS),
      homeOverflows,
    };
  }

  /**
   * Determines how many items overflow the width of the breadcrumb navigation, and whether the
   * home item still overflows once every other collapsible item has already been collapsed.
   */
  private async calculateOverflowingItems() {
    // Fallback to zero/false if the hidden nav is not available for measurement.
    if (!this.hiddenNav) return { overflowing: 0, homeOverflows: false };

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

    // Once every middle item is already collapsed, any remaining overflow can only come from the
    // home item — but only once the last item has also shrunk as far as it is allowed to. Credit
    // the last item's minimum wrapped width (`--post-breadcrumb-selected-min-width`, see
    // post-breadcrumb-item.scss) instead of its full single-line width here, so home stays fully
    // visible for as long as the last item still has room left to wrap into.
    const allItems = this.hiddenNav.querySelectorAll('post-breadcrumb-item');
    const lastItem = allItems[allItems.length - 1];
    const minWidth =
      Number.parseFloat(
        getComputedStyle(this.host).getPropertyValue('--post-breadcrumb-selected-min-width'),
      ) || 0;
    const shrinkableWidth = Math.max(lastItem.clientWidth - minWidth, 0);
    const homeOverflows = width - shrinkableWidth > this.hiddenNav.clientWidth;

    return { overflowing, homeOverflows };
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

    // Force the home item to single-line in the hidden clone, regardless of whether it is
    // currently wrapping or truncated live, so its natural (un-wrapped) width can be measured.
    clone.querySelector('.home')?.classList.add('measuring');

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

  /**
   * Renders the home item's content: the slotted `<a>` if the consumer provided one, otherwise
   * the internal fallback link. Reused by both the plain home item and the home overflow menu,
   * since the single `<slot name="home">` can only be assigned in one place per render.
   */
  private renderHomeContent() {
    return (
      <slot name="home" onSlotchange={() => this.checkSlottedHomeAnchor()}>
        <a href={this.homeUrl}>
          <span class={this.homeText ? undefined : 'visually-hidden'}>{this.textHome}</span>
          {!this.homeText && <post-icon aria-hidden="true" name="home" />}
        </a>
      </slot>
    );
  }

  /**
   * Renders the home item's own overflow menu. This is the last resort, shown only once there is
   * no room left for the home item even after every middle item is collapsed and the last item
   * has wrapped. The home item never shrinks or truncates, it swaps entirely into this menu.
   */
  private renderHomeMenu() {
    const homeMenuId = `${this.id}-home-menu`;

    return (
      <div class="breadcrumb-item home-menu" role="listitem">
        <post-menu-trigger for={homeMenuId}>
          <button>
            <span class="visually-hidden">{this.textExpandHome}</span>
            <span aria-hidden="true">...</span>
          </button>
        </post-menu-trigger>
        <post-menu id={homeMenuId} label={this.textExpandHome} placement="bottom-start">
          <post-menu-item>{this.renderHomeContent()}</post-menu-item>
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
            {this.homeCollapsed ? (
              this.renderHomeMenu()
            ) : (
              <div class={`breadcrumb-item home${this.homeText ? '' : ' icon'}`} role="listitem">
                {this.renderHomeContent()}
              </div>
            )}
            {this.renderMenu()}
            <slot />
            <slot name="selected" />
          </div>
        </nav>
      </Host>
    );
  }
}
