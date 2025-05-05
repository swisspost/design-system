import { Component, h, Host, Prop } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-test-example',
  styleUrl: 'post-test-example.scss',
  shadow: true,
})
export class PostTestExample {
  /**
   * Defines the id
   */
  @Prop() theId?: string;

  render() {
    return (
      // Shadow DOM - Same Shadow DOM
      <Host data-version={version}>
        <input id={this.theId} value="" placeholder="Placeholder" />
        <label htmlFor={this.theId}>Label Text</label>
      </Host>
    );
  }
}
