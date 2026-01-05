import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkEmptyOrOneOf } from '@/utils';
import { BUTTON_TYPES, ButtonType } from './button-types';

/**
 * @slot default - Slot for placing visually hidden label in the close button.
 */
@Component({
  tag: 'post-closebutton',
  styleUrl: 'post-closebutton.scss',
  shadow: false,
})
export class PostClosebutton {
  private mutationObserver = new MutationObserver(this.checkContent.bind(this));

  @Element() host: HTMLPostClosebuttonElement;

  /**
   * Overrides the close button's type ("button" by default)
   */
  @Prop() buttonType?: ButtonType = 'button';

  @Watch('buttonType')
  validateButtonType() {
    checkEmptyOrOneOf(this, 'buttonType', BUTTON_TYPES);
  }

  componentDidLoad() {
    this.checkContent();
  }

  connectedCallback() {
    this.mutationObserver.observe(this.host, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private checkContent() {
    this.validateButtonType();
    if (!this.host.querySelector('.visually-hidden').textContent) {
      console.error(`The \`${this.host.localName}\` component requires content for accessibility.`);
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <button type={this.buttonType}>
          <post-icon aria-hidden="true" name="closex"></post-icon>
          <span>
            <slot></slot>
          </span>
        </button>
      </Host>
    );
  }
}
