import { Component, Prop, Element, Host, h } from '@stencil/core';
/*
 * @slot default- Slot for placing the content of the list item.
 */

@Component({
  tag: 'post-listbox-item',
  shadow: true,
})
export class PostListboxItem {
  @Element() host: HTMLPostListboxItemElement;

  /**
   * Indicates if the item is currently active.
   * This will be set dynamically by the parent `listbox`.
   */
  @Prop() selected: boolean = false;

  connectedCallback() {
    this.host.setAttribute('slot', 'post-listbox-item');
  }

  render() {
    return (
      <Host role="option" tabindex="-1">
        <slot></slot>
      </Host>
    );
  }
}
