import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'post-test-list-item',
  styleUrl: 'post-test-list-item.scss',
  shadow: true,
})
export class PostTestListItem {
  render() {
    return (
      <Host>
        <div role="listitem">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
