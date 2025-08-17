import { Component, h, Host } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-menu-item',
  styleUrl: 'post-menu-item.scss',
})
export class PostMenuItem {
  render() {
    return (
      <Host data-version={version} role="menuitem">
        <li role="none">
          <slot></slot>
        </li>
      </Host>
    );
  }
}
