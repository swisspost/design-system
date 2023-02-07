/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

import { Component, Element, h, Prop, State, Watch } from '@stencil/core';
import { checkBoolean, checkNonEmptyString, checkOneOf, checkPattern } from '../../utils';

@Component({
  tag: 'post-alert',
  styleUrl: 'post-alert.scss',
  shadow: true,
})
export class PostAlert {
  /**
   * The type of the alert.
   *
   * We provide styles for the following types: `'primary'`, `'success'`, `'danger'`, `'warning'`, `'info'`.
   */
  @Prop() type = 'primary';

  /**
   * If `true`, the alert is positioned at the bottom of the window, from edge to edge.
   */
  @Prop() fixed = false;

  /**
   * If `true`, a close button (×) is displayed and the alert can be dismissed by the user.
   */
  @Prop() dismissible = false;

  /**
   * The label to use for the close button of a dismissible alert.
   */
  @Prop() dismissLabel: string;

  /**
   * The icon to display in the alert.
   *
   * If `null`, no icon will be displayed.
   * By default, the icon depends on the alert type.
   */
  @Prop() icon: string;

  @State() alertClasses: string[] = ['alert'];
  @State() hasHeading: boolean;

  @Element() host: HTMLElement;

  @Watch('type')
  validateType(alertType = this.type) {
    const alertTypes = ['primary', 'success', 'danger', 'warning', 'info'];
    checkOneOf(alertType, alertTypes, 'The post-alert requires a type.');

    alertTypes.forEach(type => this.toggleAlertClass(`alert-${type}`, type === alertType));
  }

  @Watch('fixed')
  validateFixed(isFixed = this.fixed) {
    checkBoolean(isFixed, 'The post-alert "fixed" prop should be a boolean.');

    if (isFixed) {
      this.toggleAlertClass('alert-fixed-bottom', isFixed);
    }
  }

  @Watch('dismissible')
  validateDismissible(isDismissible = this.dismissible) {
    checkBoolean(isDismissible, 'The post-alert "dismissible" prop should be a boolean.');

    if (isDismissible) {
      checkNonEmptyString(this.dismissLabel, 'Dismissible post-alert\'s require a "dismiss-label" prop.');
    }
  }

  @Watch('icon')
  validateIcon(newValue = this.icon) {
    const alertIcon = JSON.parse(newValue);

    this.toggleAlertClass('no-icon', alertIcon === null);
    this.removeAlertClass(/^pi-/);

    if (alertIcon) {
      const iconNamePattern = /success|warn|info|error-(black|red)|\d{4}/;
      checkPattern(alertIcon, iconNamePattern, 'The post-alert "icon" prop should be a 4-digits string.');

      this.addAlertClass(`pi-${alertIcon}`);
    }
  }

  componentWillLoad() {
    this.validateType();
    this.validateFixed();
    this.validateDismissible();
    this.validateIcon();

    this.hasHeading = this.host.querySelectorAll('[slot="heading"]').length > 0;
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
      return typeof className === 'string' ? c === className : !className.test(c);
    });
  }

  private addAlertClass(className: string) {
    this.alertClasses = [...this.alertClasses, className];
  }

  render() {
    return (
      <div class={this.alertClasses.join(' ')} role="alert">
        {this.dismissible && <button aria-label={this.dismissLabel} class="btn-close" type="button"/>}
        {this.hasHeading && <h4 class="alert-heading"><slot name="heading"/></h4>}
        <slot/>
      </div>
    );
  }

}
