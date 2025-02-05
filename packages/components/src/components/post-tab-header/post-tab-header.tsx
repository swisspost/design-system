import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkNonEmpty } from '@/utils';
import { nanoid } from 'nanoid';

/**
 * @slot default - Slot for the content of the tab header.
 */

@Component({
  tag: 'post-tab-header',
  styleUrl: 'post-tab-header.scss',
  shadow: true,
})
export class PostTabHeader {
  @Element() host: HTMLPostTabHeaderElement;

  @State() tabId: string;

  /**
   * The name of the panel controlled by the tab header.
   */
  @Prop({ reflect: true }) readonly panel: HTMLPostTabPanelElement['name'];

  @Watch('panel')
  validateFor(newValue: HTMLPostTabPanelElement['name']) {
    checkNonEmpty(newValue, 'The "panel" prop is required for the post-tab-header.');
  }

  componentWillLoad() {
    this.tabId = `tab-${this.host.id || nanoid(6)}`;
  }

  render() {
    return (
      <Host
        id={this.tabId}
        role="tab"
        data-version={version}
        aria-selected="false"
        tabindex="-1"
        class="tab-title"
        slot="tabs"
      >
        <slot />
      </Host>
    );
  }
}
