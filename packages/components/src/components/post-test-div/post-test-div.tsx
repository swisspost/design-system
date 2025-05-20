import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'post-test-div',
  styleUrl: 'post-test-div.scss',
  shadow: true,
})
export class PostTestDiv {
  render() {
    return (
      <Host role="list" tabindex="0">
        <slot name="list-items"></slot>
      </Host>
    );
  }
}
