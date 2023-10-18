import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { Placement } from '@floating-ui/dom';

import { version } from '../../../package.json';
@Component({
  tag: 'post-popup',
  styleUrl: 'post-popup.scss',
  shadow: true,
})
export class PostPopup {
  private popoverRef: HTMLPostPopoverElement;
  private readonly localTogglePopup: (e: Event) => Promise<void>;

  @Element() host: HTMLPostPopupElement;

  /**
   * Defines the placement of the popup according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   * Popups are automatically flipped to the opposite side if there is not enough available space and are shifted
   * towards the viewport if they would overlap edge boundaries.
   */
  @Prop() readonly placement?: Placement = 'right-end';

  constructor() {
    this.localTogglePopup = e => this.toggle(e.target as HTMLElement);
  }

  componentWillLoad() {
    // Append popup host to the end of the body to get around overflow: hidden restrictions
    // for browsers that don't support popover yet
    document.body.appendChild(this.host);
  }

  connectedCallback() {
    if (!this.triggers) {
      throw new Error(`No trigger found for <post-popup popup-id="${this.host.id}`);
    }

    // As long as cross-shadow-boundary [popovertarget] and button.popoverTargetElement are not working
    // we're left with listening to trigger events ourselfes
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/popoverTargetElement
    // https://github.com/whatwg/html/issues/9109#issuecomment-1494030465 (does not seem to work for now)
    this.attachEventListeners();
  }

  disconnectedCallback() {
    this.triggers.forEach(trigger => {
      trigger.removeEventListener('click', this.localTogglePopup);
    });
  }

  /**
   * Attach a one time event listener (see this.onToggle)
   */
  private attachEventListeners() {
    this.triggers.forEach(trigger =>
      trigger.addEventListener('click', this.localTogglePopup, { once: true }),
    );
  }

  /**
   * Programmatically display the popup
   * @param target An element with [data-popup-target="id"] where the popup should be shown
   */
  @Method()
  async show(target: HTMLElement) {
    this.popoverRef.show(target);
  }

  /**
   * Programmatically hide this popup
   */
  @Method()
  async hide() {
    this.popoverRef.hide();
  }

  /**
   * Toggle popup display
   * @param target An element with [data-popup-target="id"] where the popup should be anchored to
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean) {
    this.popoverRef.toggle(target, force);
  }

  private get triggers() {
    return document.querySelectorAll(`[data-popup-target="${this.host.id}"]`);
  }

  /**
   * One time event handler for click events
   * A permanent event listener would prevent a toggle button from working properly:
   * A click opens the popover, a second click first closes it (due to light dismiss), then directly
   * opens it again because of the click listener on the button. Registering a new
   * one time listener after a small timeout solves this issue (see this.onToggle).
   * @param e toggle event from post-popover
   */
  private onToggle(e: CustomEvent<boolean>) {
    if (!e.detail) {
      window.requestAnimationFrame(() => {
        this.attachEventListeners();
      });
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <post-popover
          arrow
          placement={this.placement}
          ref={e => (this.popoverRef = e)}
          onPostPopoverToggled={e => this.onToggle(e)}
        >
          <div>
            <button class="btn-close" onClick={() => this.hide()}>
              <span class="visually-hidden">Close</span>
            </button>
            <slot></slot>
          </div>
        </post-popover>
      </Host>
    );
  }
}
