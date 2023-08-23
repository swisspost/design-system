import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { version } from '../../../package.json';

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
    this.panelId = this.host.id || `p${crypto.randomUUID()}`;
  }

  render() {
    return (
      <Host data-version={version} id={this.panelId}>
        <div
          aria-labelledby={`${this.panelId}--tab`}
          class="tab-pane fade active show"
          id={`${this.panelId}--panel`}
          role="tabpanel"
        >
          <slot/>
        </div>
      </Host>
    );
  }
}
