import { Component, h } from '@stencil/core';

@Component({
  tag: 'post-menu-toggle',
  styleUrl: 'post-menu-toggle.scss',
  shadow: true,
})
export class PostMenuToggle {
  render() {
    return <slot></slot>;
  }
}
