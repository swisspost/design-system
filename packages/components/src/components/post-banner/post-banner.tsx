import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { version } from '@root/package.json';
import { fadeOut } from '@/animations';
import { checkEmptyOrOneOf, checkEmptyOrPattern, checkNonEmpty, checkType } from '@/utils';
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
  @Element() host: HTMLPostBannerElement;

  @State() bannerId = crypto.randomUUID();
  @State() classes: string;
  @State() hasActions: boolean;
  @State() hasHeading: boolean;
  @State() onDismissButtonClick = () => this.dismiss();

  /**
   * If `true`, a close button (×) is displayed and the banner can be dismissed by the user.
   */
  @Prop() readonly dismissible: boolean = false;

  @Watch('dismissible')
  validateDismissible(isDismissible = this.dismissible) {
    checkType(isDismissible, 'boolean', 'The post-banner "dismissible" prop should be a boolean.');
    setTimeout(() => this.validateDismissLabel());
  }

  /**
   * The label to use for the close button of a dismissible banner.
   */
  @Prop() readonly dismissLabel: string;

  @Watch('dismissLabel')
  validateDismissLabel(dismissLabel = this.dismissLabel) {
    if (this.dismissible) {
      checkNonEmpty(dismissLabel, 'Dismissible post-banner\'s require a "dismiss-label" prop.');
    }
  }

  /**
   * The icon to display in the banner. By default, the icon depends on the banner type.
   *
   * If `none`, no icon is displayed.
   */
  @Prop() readonly icon: string;

  @Watch('icon')
  validateIcon(icon = this.icon) {
    checkEmptyOrPattern(
      icon,
      /\d{4}|none/,
      'The post-banner "icon" prop should be a 4-digits string.',
    );
  }

  /**
   * The type of the banner.
   */
  @Prop() readonly type: BannerType = 'neutral';

  @Watch('type')
  validateType(type = this.type) {
    checkEmptyOrOneOf(
      type,
      BANNER_TYPES,
      `The post-banner requires a type form: ${BANNER_TYPES.join(', ')}`,
    );
  }

  /**
   * An event emitted when the banner element is dismissed, after the transition.
   * It has no payload and only relevant for dismissible banners.
   */
  @Event() postDismissed: EventEmitter<void>;

  componentDidLoad() {
    this.validateDismissible();
    this.validateIcon();
    this.validateType();
  }

  componentWillRender() {
    this.hasHeading = this.host.querySelectorAll('[slot=heading]').length > 0;
    this.hasActions = this.host.querySelectorAll('[slot=actions]').length > 0;

    this.classes = `banner ${this.type ? 'banner-' + this.type : ''}`;
    if (this.dismissible) this.classes += ' banner-dismissible';
    if (this.hasActions) this.classes += ' banner-action';
    if (this.icon === 'none') this.classes += ' no-icon';
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

  render() {
    const defaultBannerContent = [
      this.hasHeading && (
        <h4 key={`${this.bannerId}-heading`} class="banner-heading">
          <slot name="heading" />
        </h4>
      ),
      <slot key={`${this.bannerId}-message`} />,
    ];

    const actionBannerContent = [
      <div key={`${this.bannerId}-content`} class="banner-content">
        {defaultBannerContent}
      </div>,
      <div key={`${this.bannerId}-buttons`} class="banner-buttons">
        <slot name="actions" />
      </div>,
    ];

    return (
      <Host data-version={version}>
        <div role="alert" class={this.classes} part={this.classes}>
          {this.dismissible && (
            <button class="btn-close" onClick={this.onDismissButtonClick}>
              <span class="visually-hidden">{this.dismissLabel}</span>
            </button>
          )}

          {this.icon && this.icon !== 'none' && (
            <post-icon key={`${this.bannerId}-icon`} name={this.icon} />
          )}

          {this.hasActions ? actionBannerContent : defaultBannerContent}
        </div>
      </Host>
    );
  }
}
