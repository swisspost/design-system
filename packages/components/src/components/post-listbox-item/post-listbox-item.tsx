import { Component, Element, Host, h } from '@stencil/core';
/*
 * @slot default- Slot for placing the content of the list item.
 */

@Component({
  tag: 'post-listbox-item',
  styleUrl: 'post-listbox-item.scss',
  shadow: true,
})
export class PostListboxItem {
  @Element() host: HTMLPostListboxItemElement;

  connectedCallback() {
    this.host.setAttribute('slot', 'post-listbox-item');
  }

  render() {
    return (
      <Host role="option" aria-selected="false" tabindex="0">
        <slot></slot>
      </Host>
    );
  }
}
