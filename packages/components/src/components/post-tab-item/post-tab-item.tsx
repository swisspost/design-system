import { Component, Element, h, Host, Prop, State, Watch, Build } from '@stencil/core';
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
  private mutationObserver = new MutationObserver(this.checkNavigationMode.bind(this));

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
    });
  }

  componentWillLoad() {
    this.tabId = `tab-${this.host.id || nanoid(6)}`;
    this.checkNavigationMode();
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private checkNavigationMode() {
    const hasAnchor = this.host.querySelector('a') !== null;
    this.isNavigationMode = hasAnchor;
  }

  render() {
    const tabName = this.host.getAttribute('name');
    const isSSR = Build.isServer;
    return (
      <Host
        id={this.tabId}
        role={!this.isNavigationMode ? 'tab' : undefined}
        data-version={version}
        data-navigation-mode={this.isNavigationMode.toString()}
        aria-selected={!this.isNavigationMode ? 'false' : undefined}
        tabindex={!this.isNavigationMode ? '-1' : undefined}
        class={`${!this.isNavigationMode ? 'tab-title' : 'nav-item'}${isSSR && !this.isNavigationMode ? ' ssr' : ''}`}
        style={
          isSSR && !this.isNavigationMode
            ? { '--active': `var(--post-tab-item-${tabName}, 0)` }
            : undefined
        }
      >
        <slot />
      </Host>
    );
  }
}
