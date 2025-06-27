import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'post-test-list-item-group',
  styleUrl: 'post-test-list-item-group.scss',
  shadow: true,
})
export class PostTestListItemGroup {
  render() {
    return (
      <Host>
        <slot name="post-list-item"></slot>
      </Host>
    );
  }
}
