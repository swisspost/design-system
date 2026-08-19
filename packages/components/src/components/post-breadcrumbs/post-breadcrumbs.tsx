import { componentOnReady, nanoid, Required, Type, Url } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, Host, Prop, State, h } from '@stencil/core';
import { throttle } from 'throttle-debounce';
import { cloneElementWithSlots } from '@/utils/clone';
import type { HTMLStencilElement } from '@stencil/core/internal';

const MAX_VISIBLE_ITEMS = 6;
const MEASUREMENT_DEBOUNCE_MS = 50;

@Component({
  tag: 'post-breadcrumbs',
  styleUrl: 'post-breadcrumbs.scss',
  shadow: true,
})
export class PostBreadcrumbs {
  private debounceMeasurement = throttle(
    MEASUREMENT_DEBOUNCE_MS,
    this.updateCollapsedItems.bind(this),
  );

  private resizeObserver = new ResizeObserver(this.debounceMeasurement);
  private mutationObserver = new MutationObserver(this.updateHiddenNav.bind(this));

  @Element() host: HTMLPostBreadcrumbsElement;

  @State() id: string;
  @State() collapsed = 0;

  private nav: HTMLElement | null = null;
  private hiddenNav: HTMLElement | null = null;

  /**
   * The URL for the root (home) breadcrumb item.
   */
  @Prop({ reflect: true })
  @Required()
  @Url()
  homeUrl!: string;

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
  }

  async componentDidLoad() {
    this.resizeObserver.observe(document.body);
    this.mutationObserver.observe(this.host, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    await this.updateHiddenNav();
    await this.updateCollapsedItems();
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
    this.mutationObserver.disconnect();
    this.debounceMeasurement.cancel();
  }

  private async updateCollapsedItems() {
    if (!this.nav) return;

    const items = this.host.querySelectorAll('post-breadcrumb-item');

    this.collapsed =
      items.length === 1
        ? 0
        : Math.max(await this.calculateOverflowingItems(), items.length - MAX_VISIBLE_ITEMS);

    this.updateItems(items, this.collapsed);
  }

  private async calculateOverflowingItems() {
    if (!this.hiddenNav) return 0;

    let width = this.hiddenNav.scrollWidth;
    let overflowing = 0;

    const items = Array.from(this.hiddenNav.querySelectorAll('post-breadcrumb-item'));

    while (overflowing < items.length && width > this.hiddenNav.clientWidth) {
      width -= items[overflowing++].clientWidth;
    }

    return overflowing;
  }

  private updateItems(items: NodeListOf<Element>, collapsed: number) {
    items.forEach((item, index) => {
      item.setAttribute('variant', index < collapsed ? 'menuitem' : 'listitem');
      item.setAttribute('selected', String(index === items.length - 1));
    });
  }

  private async updateHiddenNav() {
    this.hiddenNav?.remove();
    this.hiddenNav = await this.renderHiddenNav();
  }

  private async renderHiddenNav() {
    const shadowRoot = this.host.shadowRoot;
    if (!shadowRoot || !this.nav) return null;

    const clone = cloneElementWithSlots(this.nav);
    clone.classList.add('invisible');

    const items = clone.querySelectorAll<HTMLStencilElement>('post-breadcrumb-item');
    shadowRoot.append(clone);

    await Promise.all(Array.from(items).map(item => componentOnReady(item)));
    this.updateItems(items, 0);

    return clone;
  }

  private renderMenu() {
    const menuId = `${this.id}-menu`;

    return (
      <div role="listitem">
        {/* Extra wrapper aligns menu with button, excluding .breadcrumb-item chevron. */}
        <div class="breadcrumb-item">
          <post-menu-trigger for={menuId}>
            <button>
              <span class="visually-hidden">{this.textMoreItems}</span>
              <span aria-hidden="true">...</span>
            </button>
          </post-menu-trigger>
        </div>

        <post-menu id={menuId} label={this.textMoreItems} placement="bottom-start">
          <slot name="menu" />
        </post-menu>
      </div>
    );
  }

  render() {
    return (
      <Host data-version={version}>
        <nav aria-label={this.textBreadcrumbs} ref={el => (this.nav = el)}>
          <div role="list">
            <div class="breadcrumb-item home" role="listitem">
              <a href={this.homeUrl}>
                <span class="visually-hidden">{this.textHome}</span>
                <post-icon aria-hidden="true" name="home" />
              </a>
            </div>
            {this.collapsed > 0 && this.renderMenu()}
            <slot />
            <slot name="selected" />
          </div>
        </nav>
      </Host>
    );
  }
}
