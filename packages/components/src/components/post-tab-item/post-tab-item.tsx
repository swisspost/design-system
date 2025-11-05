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
  @State() hasAriaCurrent = false;

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
      attributeFilter: ['aria-current'],
    });
  }

  componentWillLoad() {
    this.tabId = `tab-${this.host.id || nanoid(6)}`;
  }

  componentDidLoad() {
    this.checkNavigationMode();
    this.checkAriaCurrent();
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private handleMutations() {
    this.checkNavigationMode();
    this.checkAriaCurrent();
  }

  private checkNavigationMode() {
    const hasAnchor = this.host.querySelector('a') !== null;
    this.isNavigationMode = hasAnchor;
  }

  private checkAriaCurrent() {
    if (this.isNavigationMode) {
      const anchor = this.host.querySelector('a');
      this.hasAriaCurrent = anchor?.getAttribute('aria-current') === 'page';
    }
  }

  render() {
    const isPanelMode = !this.isNavigationMode;
    const classes = {
      'tab-title': isPanelMode,
      'nav-item': this.isNavigationMode,
      active: this.isNavigationMode && this.hasAriaCurrent,
    };

    return (
      <Host
        id={this.tabId}
        role={isPanelMode ? 'tab' : undefined}
        data-version={version}
        data-navigation-mode={this.isNavigationMode.toString()}
        aria-selected={isPanelMode ? 'false' : undefined}
        tabindex={isPanelMode ? '-1' : undefined}
        class={classes}
      >
        <slot />
      </Host>
    );
  }
}
