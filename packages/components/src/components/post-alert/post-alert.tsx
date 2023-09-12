import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { version } from '../../../package.json';
import { checkNonEmpty, checkOneOf, checkPattern, checkType, onTransitionEnd } from '../../utils';

@Component({
  tag: 'post-alert',
  styleUrl: 'post-alert.scss',
  shadow: true,
})
export class PostAlert {
  private alertElement: HTMLElement;

  @Element() host: HTMLPostAlertElement;

  @State() alertClasses: string[] = [ 'alert' ];
  @State() hasHeading: boolean;
  @State() iconName: string | null;

  /**
   * The label to use for the close button of a dismissible alert.
   */
  @Prop() readonly dismissLabel: string;

  /**
   * The type of the alert.
   *
   * We provide styles for the following types: `'primary'`, `'success'`, `'danger'`, `'warning'`, `'info'`.
   */
  @Prop() readonly type: string = 'primary';

  @Watch('type')
  validateType(alertType = this.type) {
    const alertTypes = [ 'primary', 'success', 'danger', 'warning', 'info' ];
    checkOneOf(alertType, alertTypes, `The post-alert requires a type form: ${alertTypes.join(', ')}`);

    alertTypes.forEach(type => {
      this.toggleAlertClass(`alert-${type}`, type === alertType);
    });
  }

  /**
   * If `true`, the alert is positioned at the bottom of the window, from edge to edge.
   */
  @Prop() readonly fixed = false;

  @Watch('fixed')
  validateFixed(isFixed = this.fixed) {
    checkType(isFixed, 'boolean', 'The post-alert "fixed" prop should be a boolean.');

    if (isFixed) {
      this.toggleAlertClass('alert-fixed-bottom', isFixed);
    }
  }

  /**
   * If `true`, a close button (×) is displayed and the alert can be dismissed by the user.
   */
  @Prop() readonly dismissible = false;

  @Watch('dismissible')
  validateDismissible(isDismissible = this.dismissible) {
    checkType(isDismissible, 'boolean', 'The post-alert "dismissible" prop should be a boolean.');

    this.toggleAlertClass('alert-dismissible', isDismissible);

    if (isDismissible) {
      checkNonEmpty(this.dismissLabel, 'Dismissible post-alert\'s require a "dismiss-label" prop.');
    }
  }

  /**
   * The icon to display in the alert.
   *
   * If `true`, the icon depends on the alert type.
   * If `false`, no icon is displayed.
   */
  @Prop() readonly icon: boolean | string = true;

  @Watch('icon')
  validateIcon(alertIcon = this.icon) {
    this.toggleAlertClass('no-icon', alertIcon === 'false');

    this.iconName = typeof alertIcon === 'string' && !['true', 'false'].includes(alertIcon) ? alertIcon : null;
    if (this.iconName) {
      checkPattern(alertIcon, /true|false|\d{4}/, 'The post-alert "icon" prop should be a 4-digits string.');
    }
  }

  componentWillLoad() {
    this.validateType();
    this.validateFixed();
    this.validateDismissible();
    this.validateIcon();

    this.hasHeading = this.host.querySelectorAll('[slot="heading"]').length > 0;
  }

  componentDidLoad() {
    this.alertElement = this.host.shadowRoot.querySelector('.alert');
  }

  /**
   * Triggers alert closing programmatically (same as clicking on the close button (×)).
   */
  @Method()
  async close() {
    this.removeAlertClass('show');
    await onTransitionEnd(this.alertElement).then(() => {
      this.host.remove();
    });
  }

  private toggleAlertClass(className: string, force: boolean) {
    const classInList = this.alertClasses.includes(className);

    if (classInList && !force) {
      this.removeAlertClass(className);
    } else if (!classInList && force) {
      this.addAlertClass(className);
    }
  }

  private removeAlertClass(className: string | RegExp) {
    this.alertClasses = this.alertClasses.filter(c => {
      return (typeof className === 'string') ? c !== className : !className.test(c);
    });
  }

  private addAlertClass(className: string) {
    this.alertClasses = [ ...this.alertClasses, className ];
  }

  render() {
    return (
      <Host data-version={version}>
        <div class={this.alertClasses.join(' ')} role="alert">
          {this.iconName && <post-icon name={this.iconName} class="alert-icon"></post-icon>}
          {this.dismissible && (
            <button
              aria-label={this.dismissLabel}
              class="btn-close"
              onClick={() => this.close()}
              type="button"
            />
          )}

          {this.hasHeading && (
            <h4 class="alert-heading">
              <slot name="heading"/>
            </h4>
          )}

          <slot/>
        </div>
      </Host>
    );
  }

}
