import { Component, h, Host } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-menu-item',
})
export class PostMenuItem {
  render() {
    return (
      <Host role="menuitem" data-version={version}>
        <slot></slot>
      </Host>
    );
  }
}
