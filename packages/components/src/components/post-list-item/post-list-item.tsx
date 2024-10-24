import { Component, Element, Host, h } from '@stencil/core';

/**
 * @slot default- Slot for placing list item content
 */

@Component({
  tag: 'post-list-item',
  styleUrl: 'post-list-item.scss',
  shadow: true,
})
export class PostListItem {
  @Element() host: HTMLPostListItemElement;

  connectedCallback() {
    this.host.setAttribute('slot', 'post-list-item');
  }

  render() {
    return (
      <Host role="listitem">
        <slot></slot>
      </Host>
    );
  }
}
