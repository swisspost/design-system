import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from '@stencil/core';
import { version } from '@root/package.json';
import { fadeOut } from '@/animations';
import { checkEmptyOrOneOf, checkEmptyOrPattern, checkNonEmpty, checkType } from '@/utils';
import { ALERT_TYPES, AlertType } from './alert-types';

/**
 * @slot heading - Slot for placing custom content within the alert's heading.
 * @slot actions - Slot for placing custom actions (buttons, links, etc.) within the alert.
 * @slot default - Slot for placing the main content/message of the alert.
 */

@Component({
  tag: 'post-alert',
  styleUrl: 'post-alert.scss',
  shadow: true,
})
export class PostAlert {
  @Element() host: HTMLPostAlertElement;

  @State() alertId = crypto.randomUUID();
  @State() classes: string;
  @State() hasActions: boolean;
  @State() hasHeading: boolean;
  @State() onDismissButtonClick = () => this.dismiss();

  /**
   * If `true`, a close button (×) is displayed and the alert can be dismissed by the user.
   */
  @Prop() readonly dismissible: boolean = false;

  @Watch('dismissible')
  validateDismissible(isDismissible = this.dismissible) {
    checkType(isDismissible, 'boolean', 'The post-alert "dismissible" prop should be a boolean.');
    setTimeout(() => this.validateDismissLabel());
  }

  /**
   * The label to use for the close button of a dismissible alert.
   */
  @Prop() readonly dismissLabel: string;

  @Watch('dismissLabel')
  validateDismissLabel(dismissLabel = this.dismissLabel) {
    if (this.dismissible) {
      checkNonEmpty(dismissLabel, 'Dismissible post-alert\'s require a "dismiss-label" prop.');
    }
  }

  /**
   * If `true`, the alert is positioned at the bottom of the window, from edge to edge.
   */
  @Prop() readonly fixed: boolean = false;

  @Watch('fixed')
  validateFixed(isFixed = this.fixed) {
    checkType(isFixed, 'boolean', 'The post-alert "fixed" prop should be a boolean.');
  }

  /**
   * The icon to display in the alert. By default, the icon depends on the alert type.
   *
   * If `none`, no icon is displayed.
   */
  @Prop() readonly icon: string;

  @Watch('icon')
  validateIcon(icon = this.icon) {
    checkEmptyOrPattern(
      icon,
      /\d{4}|none/,
      'The post-alert "icon" prop should be a 4-digits string.',
    );
  }

  /**
   * The type of the alert.
   */
  @Prop() readonly type: AlertType = 'primary';

  @Watch('type')
  validateType(type = this.type) {
    checkEmptyOrOneOf(
      type,
      ALERT_TYPES,
      `The post-alert requires a type form: ${ALERT_TYPES.join(', ')}`,
    );
  }

  /**
   * An event emitted when the alert element is dismissed, after the transition.
   * It has no payload and only relevant for dismissible alerts.
   */
  @Event() postDismissed: EventEmitter<void>;

  componentDidLoad() {
    this.validateDismissible();
    this.validateFixed();
    this.validateIcon();
    this.validateType();
  }

  componentWillRender() {
    this.hasHeading = this.host.querySelectorAll('[slot=heading]').length > 0;
    this.hasActions = this.host.querySelectorAll('[slot=actions]').length > 0;

    this.classes = `alert alert-${this.type ?? 'primary'}`;
    if (this.dismissible) this.classes += ' alert-dismissible';
    if (this.hasActions) this.classes += ' alert-action';
    if (this.fixed) this.classes += ' alert-fixed-bottom';
    if (this.icon === 'none') this.classes += ' no-icon';
  }

  /**
   * Triggers alert dismissal programmatically (same as clicking on the close button (×)).
   */
  @Method()
  async dismiss() {
    const dismissal = fadeOut(this.host);

    await dismissal.finished;

    this.host.remove();
    this.postDismissed.emit();
  }

  render() {
    const defaultAlertContent = [
      this.hasHeading && (
        <div key={`${this.alertId}-heading`} class="alert-heading">
          <slot name="heading" />
        </div>
      ),
      <slot key={`${this.alertId}-message`} />,
    ];

    const actionAlertContent = [
      <div key={`${this.alertId}-content`} class="alert-content">
        {defaultAlertContent}
      </div>,
      <div key={`${this.alertId}-buttons`} class="alert-buttons">
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
            <post-icon key={`${this.alertId}-icon`} name={this.icon} />
          )}

          {this.hasActions ? actionAlertContent : defaultAlertContent}
        </div>
      </Host>
    );
  }
}
