import { Component, h, Host, Element, Prop, State } from '@stencil/core';
import { nanoid } from 'nanoid';

@Component({
  tag: 'post-tab-header',
  styleUrl: 'post-tab-header.scss',
  shadow: true,
})

export class PostTabHeader {
  @Element() host: HTMLPostTabHeaderElement;
  @Prop() panel!: string;
  @State() tabId: string;

  componentWillLoad() {
    this.tabId = `tab-${nanoid(6)}`
  }

  render() {
    return (
      <Host slot="tabs" role="tab" aria-selected="false" tab-index="-1">
        <slot />
      </Host>
    )
  }
}


