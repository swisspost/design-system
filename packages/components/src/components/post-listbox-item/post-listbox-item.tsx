import { Component, Prop, Element, Host, h } from '@stencil/core';
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

  /**
   * Indicates if the item is currently active.
   * This will be set dynamically by the parent `listbox`.
   */
  @Prop() active: boolean = false;

  componentDidRender() {
    if (this.active) {
      this.host.focus();
    }
  }
  connectedCallback() {
    this.host.setAttribute('slot', 'post-listbox-item');
  }

  render() {
    return (
      <Host
        role="option"
        tabindex={this.active ? '0' : '-1'}
        aria-selected={this.active ? 'true' : 'false'}
      >
        <slot></slot>
      </Host>
    );
  }
}
