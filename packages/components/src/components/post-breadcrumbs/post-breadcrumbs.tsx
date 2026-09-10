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

  /** The number of breadcrumb items, counted from the start, moved into the overflow menu. */
  @State() collapsed = 0;

  /** Whether the home item is collapsed into its own overflow menu. */
  @State() homeCollapsed = false;

  /** Whether the last (selected) item wraps onto multiple lines. */
  @State() lastItemWraps = false;

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
   * The label of the root (home) breadcrumb item. Displayed visibly when `show-home-text` is
   * `true`, otherwise used as an accessible label alongside the home icon.
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
  showHomeText = false;

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
   * An accessible label for the overflow menu that contains the home item.
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

  // Degrade order: collapse middle items -> collapse home -> wrap the last item.

  /** Measures the available space and updates all three degrade-stage states. */
  private async updateCollapsedItems() {
    if (!this.nav) return;
    const { overflowing, homeOverflows, lastItemWraps } = await this.calculateCollapsedItems();
    this.collapsed = overflowing;
    this.homeCollapsed = homeOverflows;
    this.lastItemWraps = lastItemWraps;
  }

  private async calculateCollapsedItems() {
    const items = this.host.querySelectorAll('post-breadcrumb-item');
    const { overflowing, homeOverflows, lastItemWraps } = await this.calculateOverflowingItems();

    // Never show more than `MAX_VISIBLE_ITEMS`, even if the nav is wide enough to fit them all.
    return {
      overflowing: Math.max(overflowing, items.length - MAX_VISIBLE_ITEMS),
      homeOverflows,
      lastItemWraps,
    };
  }

  /** Runs the three degrade stages in order against the off-screen measurement clone. */
  private async calculateOverflowingItems() {
    if (!this.hiddenNav) return { overflowing: 0, homeOverflows: false, lastItemWraps: false };

    const nav = this.hiddenNav;
    const availableWidth = nav.clientWidth;
    const gap = Number.parseFloat(getComputedStyle(nav.firstElementChild).gap);
    const menuWidth = nav.querySelector<HTMLElement>('.menu')?.clientWidth ?? 0;
    const homeWidth = nav.querySelector<HTMLElement>('.home')?.clientWidth ?? 0;

    // Stage 1: collapse middle items, starting closest to home, until the rest fits.
    const middleItems = Array.from(nav.querySelectorAll('post-breadcrumb-item')).slice(0, -1);
    const { overflowing, remainingWidth } = this.collapseMiddleItems(
      middleItems,
      gap,
      menuWidth,
      availableWidth,
    );

    // Stage 2: home + last item, single-line. If that still doesn't fit, home collapses next.
    const homeOverflows = remainingWidth > availableWidth;

    // Stage 3: home's trigger is built like the menu trigger, so `menuWidth` stands in for it.
    const widthWithHomeCollapsed = remainingWidth - homeWidth + menuWidth;
    const lastItemWraps = homeOverflows && widthWithHomeCollapsed > availableWidth;

    return { overflowing, homeOverflows, lastItemWraps };
  }

  /** Stage 1: collapses middle items until the rest fits, or none are left. */
  private collapseMiddleItems(
    items: Element[],
    gap: number,
    menuWidth: number,
    availableWidth: number,
  ): { overflowing: number; remainingWidth: number } {
    // Start from the assumption that all items fit and that no menu is shown, so subtract the
    // overflow menu's width from the total.
    let width = this.hiddenNav.scrollWidth - menuWidth + gap;
    let overflowing = 0;

    while (overflowing < items.length && width > availableWidth) {
      // The overflow menu needs to be displayed as soon as the first item is moved into it, so its
      // width needs to be taken into account when measuring the remaining items.
      if (overflowing === 0) width += menuWidth;

      width -= (items[overflowing++] as HTMLElement).clientWidth + gap;
    }

    return { overflowing, remainingWidth: width };
  }

  /** Applies the degrade states to the `<post-breadcrumb-item>` elements. */
  private updateItems(items: NodeListOf<Element>, collapsed: number, lastItemWraps: boolean) {
    items.forEach((item, index) => {
      const isLast = index === items.length - 1;
      item.setAttribute('variant', index < collapsed ? 'menuitem' : 'listitem');
      item.setAttribute('selected', String(isLast));
      item.setAttribute('standalone', String(isLast && index === collapsed && lastItemWraps));
    });
  }

  /** Rebuilds the off-screen copy of the breadcrumb navigation. */
  private async updateHiddenNav() {
    this.hiddenNav?.remove();
    this.hiddenNav = await this.renderHiddenNav();
  }

  /**
   * Renders an off-screen copy of the nav for measurements. `.home` is rebuilt independently (see
   * `buildMeasurementHomeElement`) rather than cloned, since the live nav may show `.home-menu`
   * instead if home is already collapsed.
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

    // Always measure the full, uncollapsed home item — see the method doc above.
    clone.querySelector('.home, .home-menu')?.replaceWith(this.buildMeasurementHomeElement());

    clone.classList.remove('loading');
    clone.classList.add('invisible');

    // Show the overflow menu so that we can include the space it takes up in the measurement.
    clone.querySelector('.menu').classList.remove('empty');
    shadowRoot.append(clone);

    // Wait for all items to be fully hydrated before measuring.
    const items = clone.querySelectorAll<HTMLStencilElement>('post-breadcrumb-item');
    await Promise.all(Array.from(items).map(item => componentOnReady(item)));

    // Uncollapsed layout, both single-line, for measurement.
    this.updateItems(items, 0, false);

    return clone;
  }

  /** Builds `.home` in its full, uncollapsed form for measurement. Mirrors `renderHomeContent`, but as plain DOM since this runs outside the render cycle. */
  private buildMeasurementHomeElement(): HTMLElement {
    const home = document.createElement('div');
    home.className = `breadcrumb-item home${this.showHomeText ? '' : ' icon'}`;
    home.setAttribute('role', 'listitem');

    const slottedAnchor = this.hasSlottedHomeAnchor
      ? Array.from(this.host.children).find(child => child.getAttribute('slot') === 'home')
      : null;

    if (slottedAnchor) {
      home.append(slottedAnchor.cloneNode(true) as Element);
      return home;
    }

    const anchor = document.createElement('a');
    if (this.homeUrl) anchor.href = this.homeUrl;

    const label = document.createElement('span');
    if (!this.showHomeText) label.className = 'visually-hidden';
    label.textContent = this.textHome;
    anchor.append(label);

    if (!this.showHomeText) {
      const icon = document.createElement('post-icon');
      icon.setAttribute('aria-hidden', 'true');
      icon.setAttribute('name', 'home');
      anchor.append(icon);
    }

    home.append(anchor);
    return home;
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

  /** Reused by the plain home item and the home menu — a slot can only be assigned once. */
  private renderHomeContent() {
    return (
      <slot name="home" onSlotchange={() => this.checkSlottedHomeAnchor()}>
        <a href={this.homeUrl}>
          <span class={this.showHomeText ? undefined : 'visually-hidden'}>{this.textHome}</span>
          {!this.showHomeText && <post-icon aria-hidden="true" name="home" />}
        </a>
      </slot>
    );
  }

  /** Degrade stage 2: home renders in full, single-line, not yet collapsed. */
  private renderHome() {
    return (
      <div class={`breadcrumb-item home${this.showHomeText ? '' : ' icon'}`} role="listitem">
        {this.renderHomeContent()}
      </div>
    );
  }

  /** Degrade stage 2, collapsed: home's own overflow menu, once there's no room left for it. */
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
      this.updateItems(items, this.collapsed, this.lastItemWraps);
    }

    return (
      <Host data-version={version}>
        <nav
          aria-label={this.textBreadcrumbs}
          ref={el => (this.nav = el)}
          class={this.loaded ? '' : 'loading'}
        >
          <div role="list">
            {this.homeCollapsed ? this.renderHomeMenu() : this.renderHome()}
            {this.renderMenu()}
            <slot />
            <slot name="selected" />
          </div>
        </nav>
      </Host>
    );
  }
}
