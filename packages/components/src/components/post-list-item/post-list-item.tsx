import { Component, Element, Host, h } from '@stencil/core';

/**
 * @slot default- Slot for placing the content of the list item.
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
      <Host role="listitem" slot="post-list-item">
        <slot></slot>
      </Host>
    );
  }
}
