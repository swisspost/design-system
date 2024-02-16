import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { version } from '../../../package.json';

/**
 * @slot default - Slot for placing the content of the tab panel.
 */

@Component({
  tag: 'post-tab-panel',
  styleUrl: 'post-tab-panel.scss',
  shadow: true,
})
export class PostTabPanel {
  @Element() host: HTMLPostTabPanelElement;

  @State() panelId: string;

  /**
   * The name of the panel, used to associate it with a tab header.
   */
  @Prop() readonly name: string;

  componentWillLoad() {
    // get the id set on the host element or use a random id by default
    this.panelId = `panel-${this.host.id || crypto.randomUUID()}`;
  }

  render() {
    return (
      <Host data-version={version}>
        <div class="tab-pane" id={this.panelId} role="tabpanel">
          <slot />
        </div>
      </Host>
    );
  }
}
