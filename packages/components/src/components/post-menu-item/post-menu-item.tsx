import { Component, h, Element, Host } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-menu-item',
  shadow: true,
  styleUrl: 'post-menu-item.scss',
})
export class PostMenuItem {
  @Element() host: HTMLPostMenuItemElement;
  
  render() {
    return (
      <Host role="menuitem" data-version={version}>
        <slot></slot>
      </Host>
    );
  }
}
