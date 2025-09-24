import { Component, Element, h, Host } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - Slot for placing visually hidden label in the close button.
 */
@Component({
  tag: 'post-closebutton',
  styleUrl: 'post-closebutton.scss',
  shadow: true,
})
export class PostClosebutton {
  @Element() host: HTMLPostClosebuttonElement;

  componentDidLoad() {
    this.checkHiddenLabel();
  }

  private checkHiddenLabel(slot: HTMLSlotElement = this.host.shadowRoot.querySelector('.visually-hidden slot')) {
    if (slot.assignedNodes().length === 0) {
      console.error(`The \`${this.host.localName}\` component requires content for accessibility.`);
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <button class="btn btn-icon-close" type="button">
          <post-icon aria-hidden="true" name="closex"></post-icon>
          <span class="visually-hidden">
            <slot onSlotchange={() => this.checkHiddenLabel()}></slot>
          </span>
        </button>
      </Host>
    );
  }
}
