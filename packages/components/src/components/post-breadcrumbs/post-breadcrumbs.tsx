import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { nanoid } from 'nanoid';
import { throttle } from 'throttle-debounce';
import { version } from '@root/package.json';
import { checkRequiredAndUrl, checkRequiredAndType, componentOnReady } from '@/utils';

@Component({
  tag: 'post-breadcrumbs',
  styleUrl: 'post-breadcrumbs.scss',
  shadow: true,
})
export class PostBreadcrumbs {
  private mutationObserver: MutationObserver;
  private resizeObserver: ResizeObserver;

  @Element() host: HTMLPostBreadcrumbsElement;

  @State() shouldRenderMenu = false;
  @State() id: string;

  /**
   * The URL for the root (home) breadcrumb item.
   */
  @Prop({ reflect: true }) homeUrl!: string;

  @Watch('homeUrl')
  validateHomeUrl() {
    checkRequiredAndUrl(this, 'homeUrl');
  }

  /**
   * An accessible label for the root (home) breadcrumb item.
   */
  @Prop({ reflect: true }) textHome!: string;

  @Watch('textHome')
  validateTextHome() {
    checkRequiredAndType(this, 'textHome', 'string');
  }

  /**
   * An accessible label for the breadcrumb navigation.
   */
  @Prop({ reflect: true }) textBreadcrumbs!: string;

  @Watch('textBreadcrumbs')
  validateTextBreadcrumbs() {
    checkRequiredAndType(this, 'textBreadcrumbs', 'string');
  }

  /**
   * An accessible label for the overflow menu that contains collapsed breadcrumb items.
   */
  @Prop({ reflect: true }) textMoreItems!: string;

  @Watch('textMoreItems')
  validateTextMoreItems() {
    checkRequiredAndType(this, 'textMoreItems', 'string');
  }

  componentWillLoad() {
    this.id = this.host.id || `b${nanoid(6)}`;
  }

  componentDidLoad() {
    this.validateHomeUrl();
    this.validateTextHome();
    this.validateTextBreadcrumbs();
    this.validateTextMoreItems();

    this.createMutationObserver();
    this.createResizeObserver();
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
    this.resizeObserver?.disconnect();
  }

  private createMutationObserver() {
    this.mutationObserver = new MutationObserver(this.duplicateNavElement.bind(this));
    this.mutationObserver.observe(this.host, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    this.duplicateNavElement();
  }

  private createResizeObserver() {
    this.resizeObserver = new ResizeObserver(throttle(50, this.checkOverflow.bind(this)));
    this.resizeObserver.observe(document.body);
  }

  /**
   * To measure overflow, we duplicate the entire breadcrumb so an inline version is always available.
   */
  private duplicateNavElement() {
    const shadowRoot = this.host.shadowRoot;
    const nav = shadowRoot?.querySelector('nav');
    if (!shadowRoot || !nav) return;

    this.prepareBreadcrumbItemsForClone();

    const clone = nav.cloneNode(true) as HTMLElement;
    clone.classList.add('invisible');

    shadowRoot.querySelector('nav.invisible')?.remove();
    shadowRoot.append(clone);

    requestAnimationFrame(() => {
      this.duplicateSlottedElements(clone, 'slot:not([name])');
      this.duplicateSlottedElements(clone, 'slot[name="selected"]');

      this.checkOverflow();
    });
  }

  private duplicateSlottedElements(clone: Element, slotSelector: string) {
    const originalSlot = this.host.shadowRoot?.querySelector<HTMLSlotElement>(slotSelector);
    const clonedSlot = clone.querySelector(slotSelector);
    if (!originalSlot || !clonedSlot) return;

    originalSlot.assignedElements().forEach(element => {
      clonedSlot.insertAdjacentElement('beforebegin', element.cloneNode(true) as Element);
    });

    clonedSlot.remove();
  }

  private checkOverflow() {
    const hiddenNav = this.host.shadowRoot?.querySelector('nav.invisible');
    if (!hiddenNav) return;

    const breadcrumbItems = Array.from(hiddenNav.querySelectorAll('post-breadcrumb-item'));
    Promise.all(breadcrumbItems.map(item => componentOnReady(item))).then(() => {
      this.shouldRenderMenu = hiddenNav.scrollWidth > hiddenNav.clientWidth;
      this.updateBreadcrumbItemProps();
    });
  }

  private prepareBreadcrumbItemsForClone() {
    this.shouldRenderMenu = false;
    this.updateBreadcrumbItemProps();
  }

  private updateBreadcrumbItemProps() {
    const breadcrumbItems = this.host.querySelectorAll('post-breadcrumb-item');
    breadcrumbItems.forEach((item, index) => {
      item.setAttribute('variant', this.shouldRenderMenu ? 'menuitem' : 'listitem');
      item.setAttribute('selected', String(index === breadcrumbItems.length - 1));
    });
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
          <slot />
        </post-menu>
      </div>
    );
  }

  render() {
    return (
      <Host data-version={version}>
        <nav aria-label={this.textBreadcrumbs}>
          <div role="list">
            <div class="breadcrumb-item home" role="listitem">
              <a href={this.homeUrl}>
                <span class="visually-hidden">{this.textHome}</span>
                <post-icon aria-hidden="true" name="home" />
              </a>
            </div>
            {this.shouldRenderMenu ? this.renderMenu() : <slot />}
            <slot name="selected" />
          </div>
        </nav>
      </Host>
    );
  }
}
