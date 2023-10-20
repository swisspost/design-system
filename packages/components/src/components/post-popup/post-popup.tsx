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
  private localTogglePopup: (e: Event) => Promise<void>;
  private localEnterTogglePopup: (e: KeyboardEvent) => void;
  private localTouchTogglePopup: (e: TouchEvent) => void;
  private currentTarget: HTMLElement;

  @Element() host: HTMLPostPopupElement;

  /**
   * Defines the placement of the popup according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   * Popups are automatically flipped to the opposite side if there is not enough available space and are shifted
   * towards the viewport if they would overlap edge boundaries.
   */
  @Prop() readonly placement?: Placement = 'right-end';

  constructor() {
    this.localTogglePopup = e => this.toggle(e.target as HTMLElement);
    this.localEnterTogglePopup = e => {
      if (e.key === 'Enter') this.toggle(e.target as HTMLElement);
    };
    this.localTouchTogglePopup = e => {
      e.preventDefault();
      this.toggle(e.target as HTMLElement);
    };
  }

  connectedCallback() {
    if (!this.triggers) {
      throw new Error(`No trigger found for <post-popup popup-id="${this.host.id}`);
    }

    // As long as cross-shadow-boundary [popovertarget] and button.popoverTargetElement are not working
    // we're left with listening to trigger events ourselves
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/popoverTargetElement
    // https://github.com/whatwg/html/issues/9109#issuecomment-1494030465 (does not seem to work for now)
    // https://stackoverflow.com/questions/77324143/popovertargetelement-does-not-cross-shadow-boundaries?noredirect=1#comment136318281_77324143
    this.triggers.forEach(trigger => {
      // See this.onToggle for one time mouse event listener
      trigger.addEventListener('mouseup', this.localTogglePopup, { once: true });
      trigger.addEventListener('keypress', this.localEnterTogglePopup);
      trigger.addEventListener('touch', this.localTouchTogglePopup, { once: true });
      trigger.setAttribute('aria-expanded', 'false');
    });
  }

  disconnectedCallback() {
    this.triggers.forEach(trigger => {
      trigger.removeEventListener('mouseup', this.localTogglePopup);
      trigger.removeEventListener('keypress', this.localEnterTogglePopup);
      trigger.removeEventListener('touch', this.localTouchTogglePopup);
      trigger.removeAttribute('aria-expanded');
    });
  }

  /**
   * Programmatically display the popup
   * @param target An element with [data-popup-target="id"] where the popup should be shown
   */
  @Method()
  async show(target: HTMLElement) {
    this.currentTarget = target;
    this.popoverRef.show(target);
    target.setAttribute('aria-expanded', 'true');
  }

  /**
   * Programmatically hide this popup
   */
  @Method()
  async hide() {
    this.popoverRef.hide();
    this.triggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
  }

  /**
   * Toggle popup display
   * @param target An element with [data-popup-target="id"] where the popup should be anchored to
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean) {
    this.currentTarget = target;
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
   * one time listener after a small timeout solves this issue.
   * @param e toggle event from post-popover
   */
  private onToggle(e: CustomEvent<boolean>) {
    if (this.currentTarget) {
      this.currentTarget.setAttribute('aria-expanded', `${e.detail}`);
    }
    if (!e.detail) {
      window.requestAnimationFrame(() => {
        this.triggers.forEach(trigger => {
          trigger.addEventListener('mouseup', this.localTogglePopup, { once: true });
          trigger.addEventListener('touch', this.localTouchTogglePopup, { once: true });
        });
      });

      // Handle missing re-focusing logic after close. Can be removed as soon as popovertarget works correctly
      if (this.currentTarget) {
        this.currentTarget.focus();
        this.currentTarget = null;
      }
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
          <div class="popup-container">
            <div>
              <slot></slot>
            </div>
            <button class="btn-close" onClick={() => this.hide()}>
              <span class="visually-hidden">Collapse popup</span>
            </button>
          </div>
        </post-popover>
      </Host>
    );
  }
}
