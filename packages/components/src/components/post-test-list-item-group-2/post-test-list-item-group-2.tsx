import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'post-test-list-item-group-2',
  styleUrl: 'post-test-list-item-group-2.scss',
  shadow: true,
})
export class PostTestListItemGroup2 {
  render() {
    return (
      <Host>
        <slot name="list-parent"></slot>
        <div role="listitem">item 1</div>
        <div role="listitem">item 2</div>
        <div role="listitem">item 3</div>
      </Host>
    );
  }
}
