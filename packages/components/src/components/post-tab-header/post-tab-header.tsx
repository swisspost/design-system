import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType } from '@/utils';
import { nanoid } from 'nanoid';

/**
 * @slot default - Slot for the content of the tab header. Can contain text or an <a> element for navigation mode.
 */

@Component({
  tag: 'post-tab-header',
  styleUrl: 'post-tab-header.scss',
  shadow: true,
})
export class PostTabHeader {
  @Element() host: HTMLPostTabHeaderElement;

  @State() tabId: string;
  @State() isNavigationMode = false;

  /**
   * The name of the tab, used to associate it with a tab panel or identify the active tab in navigation mode.
   */
  @Prop({ reflect: true }) readonly name!: string;

  @Watch('name')
  validateName() {
    checkRequiredAndType(this, 'name', 'string');
  }

  componentWillLoad() {
    this.validateName();
    this.tabId = `tab-${this.host.id || nanoid(6)}`;
    this.checkNavigationMode();
  }

  componentDidLoad() {
    // Re-check navigation mode after content is loaded
    this.checkNavigationMode();
  }

  private checkNavigationMode() {
    const hasAnchor = this.host.querySelector('a') !== null;
    this.isNavigationMode = hasAnchor;
  }

  render() {
    const role = this.isNavigationMode ? undefined : 'tab';
    const ariaSelected = this.isNavigationMode ? undefined : 'false';
    const tabindex = this.isNavigationMode ? undefined : '-1';

    return (
      <Host
        id={this.tabId}
        role={role}
        data-version={version}
        aria-selected={ariaSelected}
        tabindex={tabindex}
        class="tab-title"
        slot="tabs"
      >
        <slot />
      </Host>
    );
  }
}
