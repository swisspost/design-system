import { Component, Element, Event, EventEmitter, Host, Method, Prop, h } from '@stencil/core';
import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  inline,
  limitShift,
  offset,
  Placement,
  shift,
  size,
} from '@floating-ui/dom';

// Polyfill for popovers, can be removed when https://caniuse.com/?search=popover is green
import '@oddbird/popover-polyfill';

import { version } from '@root/package.json';

const SIDE_MAP = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

interface PopoverElement {
  showPopover: () => void;
  hidePopover: () => void;
  togglePopover: (force?: boolean) => boolean;
}

export type PostPopoverElement = HTMLElement & PopoverElement;

/**
 * @slot - Default slot for placing content inside the popover-container.
 */

@Component({
  tag: 'post-popovercontainer',
  styleUrl: 'post-popovercontainer.scss',
})
export class PostPopovercontainer {
  @Element() host: HTMLPostPopovercontainerElement;
  private arrowRef: HTMLElement;
  private eventTarget: Element;
  private clearAutoUpdate: () => void;
  private toggleTimeoutId: number;

  /**
   * Fires whenever the popover-container gets shown or hidden, passing the new state in event.details as a boolean
   */
  @Event() postToggle: EventEmitter<boolean>;

  /**
   * Defines the placement of the popover-container according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   * Popover-containers are automatically flipped to the opposite side if there is not enough available space and are shifted
   * towards the viewport if they would overlap edge boundaries.
   */
  @Prop() readonly placement?: Placement = 'top';

  /**
   * Gap between the edge of the page and the popover-container
   */
  @Prop() readonly edgeGap?: number = 8;

  /**
   * Animation style
   */
  @Prop() readonly animation?: 'pop-in';

  /**
   * Whether or not to display a little pointer arrow
   */
  @Prop() readonly arrow?: boolean = false;

  componentDidLoad() {
    this.host.setAttribute('popover', '');
    this.host.addEventListener('beforetoggle', this.handleToggle.bind(this));
  }

  disconnectedCallback() {
    if (typeof this.clearAutoUpdate === 'function') this.clearAutoUpdate();
  }

  /**
   * Programmatically display the popover-container
   * @param target An element with [data-popover-target="id"] where the popover-container should be shown
   */
  @Method()
  async show(target: HTMLElement) {
    if (!this.toggleTimeoutId) {
      this.eventTarget = target;
      this.calculatePosition();
      this.host.showPopover();
    }
  }

  /**
   * Programmatically hide the popover-container
   */
  @Method()
  async hide() {
    if (!this.toggleTimeoutId) {
      this.eventTarget = null;
      this.host.hidePopover();
    }
  }

  /**
   * Toggle popover-container display
   * @param target An element with [data-popover-target="id"] where the popover-container should be shown
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean): Promise<boolean> {
    // Prevent instant double toggle
    if (!this.toggleTimeoutId) {
      this.eventTarget = target;
      this.calculatePosition();
      this.host.togglePopover(force);
      this.toggleTimeoutId = null;
    }
    return this.host.matches(':where(:popover-open, .popover-open');
  }

  /**
   * Start or stop auto updates based on popover-container events.
   * Popover-containers can be closed or opened with other methods than class members,
   * therefore listening to the toggle event is safer for cleaning up.
   * @param e ToggleEvent
   */
  private handleToggle(e: ToggleEvent) {
    this.toggleTimeoutId = window.setTimeout(() => (this.toggleTimeoutId = null), 10);
    const isOpen = e.newState === 'open';
    if (isOpen) {
      this.startAutoupdates();
    } else {
      if (typeof this.clearAutoUpdate === 'function') this.clearAutoUpdate();
    }
    this.postToggle.emit(isOpen);
  }

  /**
   * Start listening for DOM updates, scroll events etc. that have
   * an influence on popover-container positioning
   */
  private startAutoupdates() {
    this.clearAutoUpdate = autoUpdate(
      this.eventTarget,
      this.host,
      this.calculatePosition.bind(this),
    );
  }

  private async calculatePosition() {
    const gap = this.edgeGap;
    const middleware = [
      flip(),
      inline(),
      shift({
        padding: gap,

        // Prevents shifting away from the anchor too far, while shifting as far as possible
        // https://floating-ui.com/docs/shift#limiter
        limiter: limitShift({
          offset: 32,
        }),
      }),
      size({
        apply({ availableWidth, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth - gap * 2}px`,
          });
        },
      }),
      offset(this.arrow ? gap + 4 : gap), // 4px outside of element to account for focus outline + ~arrow size
    ];

    if (this.arrow) {
      middleware.push(arrow({ element: this.arrowRef, padding: gap }));
    }

    const {
      x,
      y,
      middlewareData,
      placement: currentPlacement,
    } = await computePosition(this.eventTarget, this.host, {
      placement: this.placement || 'top',
      strategy: 'fixed',
      middleware,
    });

    // Popover-container
    this.host.style.left = `${x}px`;
    this.host.style.top = `${y}px`;

    // Arrow
    if (this.arrow) {
      // Tutorial: https://codesandbox.io/s/mystifying-kare-ee3hmh?file=/src/index.js
      const side = currentPlacement.split('-')[0];
      const { x: arrowX, y: arrowY } = middlewareData.arrow;
      const staticSide = SIDE_MAP[side];
      const offsetBorderLineJoin = 2;

      Object.assign(this.arrowRef.style, {
        top: arrowY ? `${arrowY}px` : '',
        left: arrowX ? `${arrowX}px` : '',
        [staticSide]: `${-this.arrowRef.offsetWidth / 2 - offsetBorderLineJoin}px`,
      });

      // Add position as a class to be able to style arrow for HCM
      this.arrowRef.classList.remove(...Object.values(SIDE_MAP));
      this.arrowRef.classList.add(staticSide);
    }
  }

  render() {
    return (
      <Host data-version={version} data-animation={this.animation}>
        {this.arrow && (
          <span
            class="arrow"
            ref={el => {
              this.arrowRef = el;
            }}
          ></span>
        )}
        <slot></slot>
      </Host>
    );
  }
}
