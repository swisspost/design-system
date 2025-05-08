import { Component, h, Host, Element } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-test-target3',
  styleUrl: 'post-test-target3.scss',
  shadow: true,
})
export class PostTestTarget3 {
  @Element() host: HTMLPostTestTarget3Element;

  render() {
    return (
      <Host data-version={version}>
        <slot name="label-slot"></slot>
        <input></input>
      </Host>
    );
  }
}
