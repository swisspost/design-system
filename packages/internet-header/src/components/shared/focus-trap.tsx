import { Component, Element, Prop, State, h, Host, Watch } from '@stencil/core';
import * as focusTrap from 'focus-trap';

/**
 * Trap the focus inside a specific container.
 *
 * @param active  activate or deactivate the focus trap
 */
@Component({
  tag: 'focus-trap',
  shadow: false,
})
export class FocusTrap {
  @Prop() active: boolean = false;
  // eslint-disable-next-line @stencil-community/element-type
  @Element() host: HTMLElement;
  @State() trap: undefined | focusTrap.FocusTrap = undefined;

  @Watch('active')
  handleActiveChange(active: boolean) {
    this.toggleTrap(active);
  }

  connectedCallback() {
    if (!this.trap) {
      this.trap = focusTrap.createFocusTrap(this.host?.firstElementChild as HTMLElement, {
        allowOutsideClick: true,
      });
    }
  }

  componentDidLoad() {
    this.toggleTrap(this.active);
  }

  disconnectedCallback() {
    this.trap?.deactivate();
  }

  private toggleTrap(active: boolean) {
    if (active) {
      this.trap?.activate();
    } else {
      this.trap?.deactivate();
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
