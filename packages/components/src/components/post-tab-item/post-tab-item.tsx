import { Component, Element, h, Host, Prop, State, Watch, Build } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType } from '@/utils';
import { nanoid } from 'nanoid';

/**
 * @slot default - Slot for the content of the tab item. Can contain text or an <a> element for Page Tabs variant.
 */

@Component({
  tag: 'post-tab-item',
  styleUrl: 'post-tab-item.scss',
  shadow: true,
})
export class PostTabItem {
  private mutationObserver = new MutationObserver(this.checkPagesVariant.bind(this));

  @Element() host: HTMLPostTabItemElement;

  @State() tabId: string;
  @State() isPagesVariant = false;

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
    this.checkPagesVariant();
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private checkPagesVariant() {
    const hasAnchor = this.host.querySelector('a') !== null;
    this.isPagesVariant = hasAnchor;
  }

  render() {
    const isSSR = Build.isServer;
    return (
      <Host
        id={this.tabId}
        role={!this.isPagesVariant ? 'tab' : undefined}
        data-version={version}
        data-pages-variant={this.isPagesVariant.toString()}
        aria-selected={!this.isPagesVariant ? 'false' : undefined}
        tabindex={!this.isPagesVariant ? '-1' : undefined}
        class={`${!this.isPagesVariant ? 'tab-title' : 'nav-item'}${isSSR && !this.isPagesVariant ? ' ssr' : ''}`}
        style={
          isSSR && !this.isPagesVariant
            ? { '--active': `var(--post-tab-item-${this.name}, 0)` }
            : undefined
        }
      >
        <slot />
      </Host>
    );
  }
}
