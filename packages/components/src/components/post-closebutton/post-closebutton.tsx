import { Component, Element, h, Host, Prop } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - The post-closebutton is a slot in itself to be used easily in other components.
 */
@Component({
  tag: 'post-closebutton',
  shadow: false,
})
export class PostLogo {
  @Element() host: HTMLPostClosebuttonElement;

  /**
   * The a11y label to use for the close button.
   */
  @Prop() readonly label?: string = 'Close button';

  render() {
    return (
      <Host data-version={version} slot="post-closebutton">
        <button class="btn btn-icon-close">
          <post-icon aria-hidden="true" name="2043"></post-icon>
          <span class="visually-hidden">{this.label}</span>
        </button>
      </Host>
    );
  }
}
