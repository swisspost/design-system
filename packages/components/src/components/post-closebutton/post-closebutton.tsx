import { Component, Element, h, Host } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - Slot for placing visually hidden label in the close button.
 */
@Component({
  tag: 'post-closebutton',
  shadow: false,
  styleUrl: 'post-closebutton.scss',
})
export class PostClosebutton {
  @Element() host: HTMLPostClosebuttonElement;

  render() {
    return (
      <Host data-version={version}>
        <button class="btn btn-icon-close">
          <post-icon aria-hidden="true" name="closex"></post-icon>
          <span class="visually-hidden">
            <slot></slot>
          </span>
        </button>
      </Host>
    );
  }
}
