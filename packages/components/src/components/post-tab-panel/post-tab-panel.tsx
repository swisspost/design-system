import { Component, h, Host, Element, Prop, State } from '@stencil/core';
import { nanoid } from 'nanoid';

@Component ({
  tag: 'post-tab-panel',
  styleUrl: 'post-tab-panel.scss',
  shadow: true,
})

export class PostTabPanel {
  @Element() host: HTMLPostTabPanelElement;
  @Prop() name!: string;
  @State() panelID: string;

  componentWillLoad() {
    this.panelID = `panel-${nanoid(6)}`
  }

  render() {
    return (
      <Host role="tabpanel" id={this.panelID}>
        <slot />
      </Host>
    )
  }
}