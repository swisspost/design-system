import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  inline,
  offset,
  Placement,
  shift,
  limitShift,
  size,
} from '@floating-ui/dom';

// Polyfill for popovers, can be removed when https://caniuse.com/?search=popover is green
import '@oddbird/popover-polyfill';

import { version } from '../../../package.json';

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

@Component({
  tag: 'post-popovercontainer',
  styleUrl: 'post-popovercontainer.scss',
  shadow: true,
})
export class PostPopovercontainer {
  @Element() host: HTMLPostPopovercontainerElement;
  private popoverRef: PostPopoverElement;
  private arrowRef: HTMLElement;
  private eventTarget: Element;
  private clearAutoUpdate: () => void;

  /**
   * Fires whenever the popover gets shown or hidden, passing the new state in event.details as a boolean
   */
  @Event() postPopoverToggled: EventEmitter<boolean>;

  /**
   * Defines the placement of the tooltip according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   * Tooltips are automatically flipped to the opposite side if there is not enough available space and are shifted
   * towards the viewport if they would overlap edge boundaries.
   */
  @Prop() readonly placement?: Placement = 'top';

  /**
   * Wheter or not to display a little pointer arrow
   */
  @Prop() readonly arrow?: boolean = false;

  componentDidLoad() {
    this.popoverRef.setAttribute('popover', '');
    this.popoverRef.addEventListener('beforetoggle', this.handleToggle.bind(this));
  }

  disconnectedCallback() {
    if (this.popoverRef)
      this.popoverRef.removeEventListener('beforetoggle', e =>
        this.toggle(e.target as HTMLPostPopovercontainerElement),
      );

    if (typeof this.clearAutoUpdate === 'function') this.clearAutoUpdate();
  }

  /**
   * Programmatically display the tooltip
   * @param target An element with [data-tooltip-target="id"] where the tooltip should be shown
   */
  @Method()
  async show(target: HTMLElement) {
    this.eventTarget = target;
    this.popoverRef.showPopover();
  }

  /**
   * Programmatically hide this tooltip
   */
  @Method()
  async hide() {
    this.eventTarget = null;
    this.popoverRef.hidePopover();
  }

  /**
   * Toggle tooltip display
   * @param target An element with [data-tooltip-target="id"] where the tooltip should be shown
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean) {
    this.eventTarget = target;
    this.popoverRef.togglePopover(force);
  }

  /**
   * Start or stop auto updates based on tooltip events.
   * Tooltips can be closed or opened with other methods than class members,
   * therefore listening to the toggle event is safer for cleaning up.
   * @param e ToggleEvent
   */
  private handleToggle(e: ToggleEvent) {
    const isOpen = e.newState === 'open';
    if (isOpen) {
      this.startAutoupdates();
    } else {
      if (typeof this.clearAutoUpdate === 'function') this.clearAutoUpdate();
    }
    this.postPopoverToggled.emit(isOpen);
  }

  /**
   * Start listening for DOM updates, scroll events etc. that have
   * an influence on tooltip positioning
   */
  private startAutoupdates() {
    this.clearAutoUpdate = autoUpdate(
      this.eventTarget,
      this.popoverRef,
      this.calculatePosition.bind(this),
    );
  }

  private async calculatePosition() {
    const middleware = [
      flip(),
      inline(),
      shift({
        padding: 8,

        // Prevents shifting away from the anchor too far, while shifting as far as possible
        // https://floating-ui.com/docs/shift#limiter
        limiter: limitShift({
          offset: 32,
        }),
      }),
      size({
        apply({ availableWidth, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth - 16}px`,
          });
        },
      }),
      offset(this.arrow ? 12 : 8), // 4px outside of element to account for focus outline + ~arrow size
    ];

    if (this.arrow) {
      middleware.push(arrow({ element: this.arrowRef, padding: 8 }));
    }

    const {
      x,
      y,
      middlewareData,
      placement: currentPlacement,
    } = await computePosition(this.eventTarget, this.popoverRef, {
      placement: this.placement || 'top',
      strategy: 'fixed',
      middleware,
    });

    // Tooltip
    this.popoverRef.style.left = `${x}px`;
    this.popoverRef.style.top = `${y}px`;

    // Arrow
    if (this.arrow) {
      // Tutorial: https://codesandbox.io/s/mystifying-kare-ee3hmh?file=/src/index.js
      const side = currentPlacement.split('-')[0];
      const { x: arrowX, y: arrowY } = middlewareData.arrow;
      const staticSide = SIDE_MAP[side];

      Object.assign(this.arrowRef.style, {
        top: arrowY ? `${arrowY}px` : '',
        left: arrowX ? `${arrowX}px` : '',
        [staticSide]: `${-this.arrowRef.offsetWidth / 2}px`,
      });
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <div
          class="popover"
          part="popover"
          ref={(el: HTMLDivElement & PostPopoverElement) => (this.popoverRef = el)}
        >
          {this.arrow && (
            <span
              class="arrow"
              ref={el => {
                this.arrowRef = el;
              }}
            ></span>
          )}
          <slot></slot>
        </div>
      </Host>
    );
  }
}
