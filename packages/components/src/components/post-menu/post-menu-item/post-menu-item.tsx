import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'post-menu-item',
  shadow: true,
  styleUrl: 'post-menu-item.scss',
})
export class PostMenuItem {
  @Prop() href?: string;

  render() {
    if (this.href) {
      return (
        <a href={this.href} role="menuitem" tabindex="0">
          <slot></slot>
        </a>
      );
    }

    return (
      <div role="menuitem" tabindex="0">
        <slot></slot>
      </div>
    );
  }
}
