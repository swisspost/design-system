import { Component, h, Host, Prop } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-test-label',
  styleUrl: 'post-test-label.scss',
  shadow: true,
})
export class PostTestLabel {
  /**
   * Defines the for
   */
  @Prop() for?: string;

  render() {
    return (
      <Host data-version={version}>
        <label htmlFor={this.for}>Label ShadowDOM</label>
        <slot></slot>
      </Host>
    );
  }
}
