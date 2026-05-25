import { OneOf, Required } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, h, Host, Prop } from '@stencil/core';
import { BUTTON_TYPES, ButtonType, Placement, PLACEMENT, SIZE, Size } from './types';

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
   * The "type" attribute used for the close button
   */
  @OneOf(BUTTON_TYPES)
  @Prop()
  buttonType?: ButtonType = 'button';

  /**
   * Defines whether the close button is positioned automatically by the component or left unpositioned for manual styling.
   */
  @Required()
  @OneOf(PLACEMENT)
  @Prop({ reflect: true })
  placement: Placement = 'auto';

  /**
   * The size of the close button.
   */
  @Required()
  @OneOf(SIZE)
  @Prop({ reflect: true })
  size: Size = 'default';

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
    if (!this.host.querySelector('.visually-hidden').textContent) {
      console.error(`The \`${this.host.localName}\` component requires content for accessibility.`);
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <button type={this.buttonType} class="btn btn-icon btn-secondary btn-sm">
          <post-icon aria-hidden="true" name="closex"></post-icon>
          <span class="visually-hidden">
            <slot></slot>
          </span>
        </button>
      </Host>
    );
  }
}
