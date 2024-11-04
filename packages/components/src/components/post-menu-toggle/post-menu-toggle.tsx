import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'post-menu-toggle',
  styleUrl: 'post-menu-toggle.scss',
  shadow: true,
})
export class PostMenuToggle {
  render() {
    return (
      <Host aria-haspopup="true">
        <slot></slot>
      </Host>
    );
  }
}
