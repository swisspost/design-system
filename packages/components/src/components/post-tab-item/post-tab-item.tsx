import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType } from '@/utils';
import { nanoid } from 'nanoid';

/**
 * @slot default - Slot for the content of the tab item. Can contain text or an <a> element for navigation mode.
 */

@Component({
  tag: 'post-tab-item',
  styleUrl: 'post-tab-item.scss',
  shadow: true,
})
export class PostTabItem {
  private mutationObserver = new MutationObserver(this.handleMutations.bind(this));

  @Element() host: HTMLPostTabItemElement;

  @State() tabId: string;
  @State() isNavigationMode = false;

  /**
   * The name of the tab, used to associate it with a tab panel or identify the active tab in panel mode.
   */
  @Prop({ reflect: true }) readonly name!: string;

  @Watch('name')
  validateName() {
    checkRequiredAndType(this, 'name', 'string');
  }

  connectedCallback() {
    this.mutationObserver.observe(this.host, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  componentWillLoad() {
    this.tabId = `tab-${this.host.id || nanoid(6)}`;
  }

  componentDidLoad() {
    this.checkNavigationMode();
    this.syncAriaCurrent();
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private handleMutations() {
    this.checkNavigationMode();
    this.syncAriaCurrent();
  }

  private checkNavigationMode() {
    const hasAnchor = this.host.querySelector('a') !== null;
    this.isNavigationMode = hasAnchor;
  }

  private syncAriaCurrent() {
    if (!this.isNavigationMode) return;

    const anchor = this.host.querySelector('a');
    if (!anchor) return;

    const isActive = this.host.classList.contains('active');

    if (isActive) {
      anchor.setAttribute('aria-current', 'page');
    } else {
      anchor.removeAttribute('aria-current');
    }
  }

  render() {
    return (
      <Host
        id={this.tabId}
        role={!this.isNavigationMode ? 'tab' : undefined}
        data-version={version}
        data-navigation-mode={this.isNavigationMode.toString()}
        aria-selected={!this.isNavigationMode ? 'false' : undefined}
        tabindex={!this.isNavigationMode ? '-1' : undefined}
        class={!this.isNavigationMode ? 'tab-title' : 'nav-item'}
      >
        <slot />
      </Host>
    );
  }
}
