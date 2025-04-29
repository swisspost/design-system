import { Component, h, Host, Prop } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-test-input',
  styleUrl: 'post-test-input.scss',
  shadow: true,
})
export class PostTestInput {
  /**
   * Defines the inputId
   */
  @Prop() inputId?: string;

  render() {
    return (
      <Host data-version={version}>
        <input type="text" id={this.inputId} value="Input ShadowDOM"></input>
        <slot></slot>
      </Host>
    );
  }
}
