import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'post-test-list-2',
  styleUrl: 'post-test-list-2.scss',
  shadow: true,
})
export class PostTestList2 {
  render() {
    return (
      <Host>
        <div role="list" tabindex="0">
          <post-test-list-item>item 1</post-test-list-item>
          <post-test-list-item>item 2</post-test-list-item>
          <post-test-list-item>item 3</post-test-list-item>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
