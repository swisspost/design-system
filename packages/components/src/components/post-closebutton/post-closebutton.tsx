import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { Component, Element, h, Host, Prop } from '@stencil/core';
import { BUTTON_TYPES, ButtonType, Placement, PLACEMENT, SIZE, Size } from './types';

/**
 * @slot default - Slot for placing visually hidden label in the close button.
 */
@Component({
  tag: 'post-closebutton',
  styleUrl: 'post-closebutton.scss',
  shadow: true,
  formAssociated: true,
})
export class PostClosebutton {
  @AttachInternals() internals: ElementInternals;

  private mutationObserver: MutationObserver;

  private visuallyHidden: HTMLSpanElement;

  @Element() host: HTMLPostClosebuttonElement;

  /**
   * The "type" attribute used for the close button
   */
  @Prop()
  @OneOf(BUTTON_TYPES)
  buttonType?: ButtonType = 'button';

  /**
   * Defines whether the close button is positioned automatically by the component or left unpositioned for manual styling.
   */
  @Prop({ reflect: true })
  @Required()
  @OneOf(PLACEMENT)
  placement: Placement = 'auto';

  /**
   * The size of the close button.
   */
  @Prop({ reflect: true })
  @Required()
  @OneOf(SIZE)
  size: Size = 'default';

  componentDidLoad() {
    if (globalThis.MutationObserver) {
      this.mutationObserver = new MutationObserver(this.checkContent.bind(this));
      this.mutationObserver.observe(this.host, {
        childList: true,
      });
    }
    this.checkContent();
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

  private handleClick() {
    if (this.buttonType === 'submit') this.internals.form?.requestSubmit();
    else if (this.buttonType === 'reset') this.internals.form?.reset();
  }

  render() {
    return (
      <Host data-version={version}>
        <button
          type={this.buttonType}
          class="btn btn-icon btn-secondary btn-sm"
          onClick={() => this.handleClick()}
        >
          <post-icon aria-hidden="true" name="closex"></post-icon>
          <span ref={el => (this.visuallyHidden = el as HTMLSpanElement)} class="visually-hidden">
            <slot></slot>
          </span>
        </button>
      </Host>
    );
  }
}
