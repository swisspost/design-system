import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import { Placement } from '@floating-ui/dom';

import { version } from '../../../package.json';
@Component({
  tag: 'post-popover',
  styleUrl: 'post-popover.scss',
  shadow: true,
})
export class PostPopover {
  private popoverRef: HTMLPostPopovercontainerElement;
  private localTogglePopover: (e: Event) => Promise<void>;
  private localEnterTogglePopover: (e: KeyboardEvent) => void;
  private localTouchTogglePopover: (e: TouchEvent) => void;
  private currentTarget: HTMLElement;

  @Element() host: HTMLPostPopoverElement;

  /**
   * Defines the placement of the popover according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   * Popoverss are automatically flipped to the opposite side if there is not enough available space and are shifted
   * towards the viewport if they would overlap edge boundaries.
   */
  @Prop() readonly placement?: Placement = 'top';

  /**
   * Define the caption of the close button for assistive technology
   */
  @Prop() readonly closeButtonCaption!: string;
  /**
   * Show a little indicator arrow
   */
  // eslint-disable-next-line @stencil-community/ban-default-true
  @Prop() readonly arrow?: boolean = true;

  constructor() {
    this.localTogglePopover = e => this.toggle(e.target as HTMLElement);
    this.localEnterTogglePopover = e => {
      if (e.key === 'Enter') this.toggle(e.target as HTMLElement);
    };
    this.localTouchTogglePopover = e => {
      e.preventDefault();
      this.toggle(e.target as HTMLElement);
    };
  }

  connectedCallback() {
    if (!this.triggers) {
      throw new Error(`No trigger found for <post-popover popover-id="${this.host.id}`);
    }

    // As long as cross-shadow-boundary [popovertarget] and button.popoverTargetElement are not working
    // we're left with listening to trigger events ourselves
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement/popoverTargetElement
    // https://github.com/whatwg/html/issues/9109#issuecomment-1494030465 (does not seem to work for now)
    // https://stackoverflow.com/questions/77324143/popovertargetelement-does-not-cross-shadow-boundaries?noredirect=1#comment136318281_77324143
    this.triggers.forEach(trigger => {
      // See this.onToggle for one time mouse event listener
      trigger.addEventListener('mouseup', this.localTogglePopover, { once: true });
      trigger.addEventListener('keypress', this.localEnterTogglePopover);
      trigger.addEventListener('touch', this.localTouchTogglePopover, { once: true });
      trigger.setAttribute('aria-expanded', 'false');
    });
  }

  disconnectedCallback() {
    this.triggers.forEach(trigger => {
      trigger.removeEventListener('mouseup', this.localTogglePopover);
      trigger.removeEventListener('keypress', this.localEnterTogglePopover);
      trigger.removeEventListener('touch', this.localTouchTogglePopover);
      trigger.removeAttribute('aria-expanded');
    });
  }

  /**
   * Programmatically display the popover
   * @param target An element with [data-popover-target="id"] where the popover should be shown
   */
  @Method()
  async show(target: HTMLElement) {
    this.currentTarget = target;
    this.popoverRef.show(target);
    target.setAttribute('aria-expanded', 'true');
  }

  /**
   * Programmatically hide this popover
   */
  @Method()
  async hide() {
    this.popoverRef.hide();
    this.triggers.forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
  }

  /**
   * Toggle popover display
   * @param target An element with [data-popover-target="id"] where the popover should be anchored to
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean) {
    this.currentTarget = target;
    this.popoverRef.toggle(target, force);
  }

  private get triggers() {
    return document.querySelectorAll(`[data-popover-target="${this.host.id}"]`);
  }

  /**
   * One time event handler for click events
   * A permanent event listener would prevent a toggle button from working properly:
   * A click opens the popover, a second click first closes it (due to light dismiss), then directly
   * opens it again because of the click listener on the button. Registering a new
   * one time listener after a small timeout solves this issue.
   * @param e toggle event from post-popovercontainer
   */
  private onToggle(e: CustomEvent<boolean>) {
    if (this.currentTarget) {
      this.currentTarget.setAttribute('aria-expanded', `${e.detail}`);
    }
    if (!e.detail) {
      window.requestAnimationFrame(() => {
        this.triggers.forEach(trigger => {
          trigger.addEventListener('mouseup', this.localTogglePopover, { once: true });
          trigger.addEventListener('touch', this.localTouchTogglePopover, { once: true });
        });
      });

      // Handle missing re-focusing logic after close. Can be removed as soon as popovertarget works correctly
      if (this.currentTarget) {
        this.currentTarget.focus();
        this.currentTarget = null;
      }
    }
  }

  // Fix for firefox to prevent the following lines from triggering
  // https://github.com/oddbird/popover-polyfill/blob/main/src/popover.ts#L338
  private stopImmediatePropagation(e: PointerEvent) {
    e.stopImmediatePropagation();
  }

  render() {
    return (
      <Host data-version={version}>
        <post-popovercontainer
          arrow={this.arrow}
          placement={this.placement}
          ref={e => (this.popoverRef = e)}
          onPostPopoverToggled={e => this.onToggle(e)}
        >
          <div
            class="popover-container"
            onPointerDown={e => this.stopImmediatePropagation(e)}
            onPointerUp={e => this.stopImmediatePropagation(e)}
          >
            <div class="popover-content">
              <slot></slot>
            </div>
            <button class="btn-close" onClick={() => this.hide()}>
              <span class="visually-hidden">{this.closeButtonCaption}</span>
            </button>
          </div>
        </post-popovercontainer>
      </Host>
    );
  }
}
