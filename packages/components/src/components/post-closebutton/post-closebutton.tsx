import { Component, Element, h, Host, Prop } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - Slot for placing visually hidden label in the close button.
 */
@Component({
  tag: 'post-closebutton',
  styleUrl: 'post-closebutton.scss',
  shadow: false,
})
export class PostClosebutton {
  private mutationObserver = new MutationObserver(this.checkHiddenLabel.bind(this));

  @Element() host: HTMLPostClosebuttonElement;

  /**
   * Overrides the close button's type ("button" by default)
   */
  @Prop() buttonType: HTMLButtonElement['type'] = 'button';

  componentDidLoad() {
    this.checkHiddenLabel();
  }

  connectedCallback() {
    this.mutationObserver.observe(this.host, { childList: true, characterData: true, subtree: true }
);
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private checkHiddenLabel() {
    if (!this.host.querySelector('.visually-hidden').textContent) {
      console.error(`The \`${this.host.localName}\` component requires content for accessibility.`);
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <button class="btn btn-icon-close" type={this.buttonType}>
          <post-icon aria-hidden="true" name="closex"></post-icon>
          <span class="visually-hidden">
            <slot></slot>
          </span>
        </button>
      </Host>
    );
  }
}
