import { Component, h, Host } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-menu-item',
  styleUrl: 'post-menu-item.scss',
})
export class PostMenuItem {
  render() {
    return (
      <Host data-version={version}>
        <slot></slot>
      </Host>
    );
  }
}
