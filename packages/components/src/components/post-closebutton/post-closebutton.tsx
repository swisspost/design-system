import { AttachInternals, Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkEmptyOrOneOf, checkRequiredAndOneOf } from '@/utils';
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
  private mutationObserver = new MutationObserver(this.checkContent.bind(this));

  @Element() host: HTMLPostClosebuttonElement;
  @AttachInternals() internals!: ElementInternals;

  /**
   * The "type" attribute used for the close button
   */
  @Prop() buttonType?: ButtonType = 'button';

  @Watch('buttonType')
  validateButtonType() {
    checkEmptyOrOneOf(this, 'buttonType', BUTTON_TYPES);
  }

  /**
   * Defines whether the close button appears inside the element or overlayed outside its top-right corner.
   */
  @Prop({ reflect: true }) placement: Placement = 'outside';

  @Watch('placement')
  validatePlacement() {
    checkRequiredAndOneOf(this, 'placement', PLACEMENT);
  }

  /**
   * The size of the close button.
   */
  @Prop({ reflect: true }) size?: Size;

  @Watch('size')
  validateSize() {
    checkEmptyOrOneOf(this, 'size', SIZE);
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

  private handleClick() {
    const form = this.internals.form;
    if (!form) return;

    if (this.buttonType === 'submit') {
      if (typeof form.requestSubmit === 'function') {
        form.requestSubmit();
      } else {
        form.submit();
      }
    } else if (this.buttonType === 'reset') {
      form.reset();
    }
  }

  private checkContent() {
    this.validateButtonType();
    this.validatePlacement();
    this.validateSize();

    if (!this.host.textContent) {
      console.error(`The \`${this.host.localName}\` component requires content for accessibility.`);
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <button
          type={this.buttonType}
          class="btn btn-icon btn-secondary btn-sm"
          onClick={this.handleClick.bind(this)}
        >
          <post-icon aria-hidden="true" name="closex"></post-icon>
          <span class="visually-hidden">
            <slot></slot>
          </span>
        </button>
      </Host>
    );
  }
}
