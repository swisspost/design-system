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
    
    // Expose mode to parent post-tabs via data-attribute (as per requirements)
    this.host.setAttribute('data-navigation-mode', this.isNavigationMode.toString());
  }

  render() {
    // Only set ARIA attributes and tabindex in panel mode
    const isPanelMode = !this.isNavigationMode;
    return (
      <Host
        id={this.tabId}
        role={isPanelMode ? 'tab' : undefined}
        data-version={version}
        aria-selected={isPanelMode ? 'false' : undefined}
        tabindex={isPanelMode ? '-1' : undefined}
        class="tab-title"
        slot="tabs"
      >
        <slot />
      </Host>
    );
  }
}
