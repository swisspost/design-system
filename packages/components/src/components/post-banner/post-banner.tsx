import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { version } from '@root/package.json';
import { fadeOut } from '@/animations';
import { checkRequiredAndType, checkEmptyOrOneOf } from '@/utils';
import { BANNER_TYPES, BannerType } from './banner-types';

/**
 * @slot heading - Slot for placing custom content within the banner's heading.
 * @slot actions - Slot for placing custom actions (buttons, links, etc.) within the banner.
 * @slot default - Slot for placing the main content/message of the banner.
 */

@Component({
  tag: 'post-banner',
  styleUrl: 'post-banner.scss',
  shadow: true,
})
export class PostBanner {
  private mutationObserver = new MutationObserver(this.checkContent.bind(this));

  @Element() host: HTMLPostBannerElement;

  @State() hasActions = false;

  /**
   * If `true`, a close button (×) is displayed and the banner can be dismissed by the user.
   */
  @Prop({reflect: true}) readonly dismissible: boolean = false;

  @Watch('dismissible')
  checkDismissible() {
    if (this.dismissible) {
      setTimeout(() => {
        checkRequiredAndType(this, 'dismissLabel', 'string');
      });
    }
  }

  /**
   * The label to use for the close button of a dismissible banner.
   */
  @Prop() readonly dismissLabel?: string;

  /**
   * The type of the banner.
   */
  @Prop({reflect: true}) readonly type: BannerType = 'info';

  @Watch('type')
  validateType() {
    checkEmptyOrOneOf(this, 'type', BANNER_TYPES);
  }

  /**
   * An event emitted when the banner element is dismissed, after the transition.
   * It has no payload and only relevant for dismissible banners.
   */
  @Event() postDismissed: EventEmitter<void>;

  connectedCallback() {
    this.mutationObserver.observe(this.host, { childList: true });
  }

  componentDidLoad() {
    this.checkContent();
    this.checkDismissible();
    this.validateType();
  }

  disconnectedCallback() {
    this.mutationObserver.disconnect();
  }

  /**
   * Triggers banner dismissal programmatically (same as clicking on the close button (×)).
   */
  @Method()
  async dismiss() {
    const dismissal = fadeOut(this.host);

    await dismissal.finished;

    this.host.remove();
    this.postDismissed.emit();
  }

  private checkContent() {
    this.hasActions = this.host.querySelectorAll('[slot="actions"]').length > 0;
  }

  render() {
    return (
      <Host data-version={version} role="alert">
        {this.dismissible && (
          <button class="btn-close" onClick={() => this.dismiss()}>
            <span>{this.dismissLabel}</span>
          </button>
        )}


        <slot name="heading" />

        <slot />

        {this.hasActions && (
          <div class="actions">
            <slot name="actions" />
          </div>
        )}
      </Host>
    );
  }
}
