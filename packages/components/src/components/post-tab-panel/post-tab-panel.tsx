import { nanoid, Required, Type } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, h, Host, Prop, State } from '@stencil/core';

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
   * The name of the tab that this panel is associated with.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  readonly for!: string;

  componentWillLoad() {
    // get the id set on the host element or use a random id by default
    this.panelId = `panel-${this.host.id || nanoid(6)}`;
  }

  render() {
    return (
      <Host data-version={version} id={this.panelId} role="tabpanel" slot="panels">
        <slot />
      </Host>
    );
  }
}
