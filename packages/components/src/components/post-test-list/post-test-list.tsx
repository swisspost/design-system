import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'post-test-list',
  styleUrl: 'post-test-list.scss',
  shadow: true,
})
export class PostTestList {
  render() {
    return (
      <Host>
        <div role="list" tabindex="0">
          <slot name="post-list-item"></slot>
        </div>
      </Host>
    );
  }
}
