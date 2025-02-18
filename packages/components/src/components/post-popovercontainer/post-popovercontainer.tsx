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

interface PopoverElement {
  showPopover: () => void;
  hidePopover: () => void;
  togglePopover: (force?: boolean) => boolean;
}

export type PostPopoverElement = HTMLElement & PopoverElement;

/**
 * @slot - Default slot for placing content inside the popovercontainer.
 */

@Component({
  tag: 'post-popovercontainer',
  styleUrl: 'post-popovercontainer.scss',
})
export class PostPopovercontainer {
  private static readonly STATIC_SIDES = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  } as const;

  private static readonly PROPERTIES_TO_CLEAR = [
    '--safe-space-popover-x',
    '--safe-space-popover-y',
    '--safe-space-popover-x-start',
    '--safe-space-popover-x-end',
    '--safe-space-popover-y-start',
    '--safe-space-popover-y-end',
    '--safe-space-trigger-x',
    '--safe-space-trigger-y',
    '--safe-space-trigger-x-start',
    '--safe-space-trigger-x-end',
    '--safe-space-trigger-y-start',
    '--safe-space-trigger-y-end',
  ] as const;

  @Element() host: HTMLPostPopovercontainerElement;
  private arrowRef: HTMLElement;
  private eventTarget: Element;
  private clearAutoUpdate: () => void;
  private toggleTimeoutId: number;

  /**
   * Fires whenever the popover gets shown or hidden, passing the new state in event.details as a boolean
   */
  @Event() postToggle: EventEmitter<boolean>;

  /**
   * Whether or not the popover should close when user clicks outside of it
   */
  @Prop() manualClose: boolean = false;

  /**
   * Defines the placement of the tooltip according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   * Tooltips are automatically flipped to the opposite side if there is not enough available space and are shifted
   * towards the viewport if they would overlap edge boundaries.
   */
  @Prop() readonly placement?: Placement = 'top';

  /**
   * Gap between the edge of the page and the popover
   */
  @Prop() readonly edgeGap?: number = 8;

  /**
   * Whether or not to display a little pointer arrow
   */
  @Prop() readonly arrow?: boolean = false;

  /**
   * Enables a safespace through which the cursor can be moved without the popover being disabled
   */
  @Prop({ reflect: true }) readonly safeSpace?: 'triangle' | 'trapezoid';

  /**
   * Updates cursor position for safe space feature when popover is open.
   * Sets CSS custom properties for dynamic styling of safe area.
   * @param event MouseEvent with cursor position
   */
  private mouseTrackingHandler(event: MouseEvent) {
    this.host.style.setProperty('--safe-space-cursor-x', `${event.clientX}px`);
    this.host.style.setProperty('--safe-space-cursor-y', `${event.clientY}px`);
  }

  componentDidLoad() {
    this.host.addEventListener('beforetoggle', this.handleToggle.bind(this));
  }

  disconnectedCallback() {
    if (typeof this.clearAutoUpdate === 'function') {
      this.clearAutoUpdate();
    }
  }

  /**
   * Programmatically display the tooltip
   * @param target An element with [data-tooltip-target="id"] where the tooltip should be shown
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
   * Programmatically hide this tooltip
   */
  @Method()
  async hide() {
    if (!this.toggleTimeoutId) {
      this.eventTarget = null;
      this.host.hidePopover();
    }
  }

  /**
   * Toggle tooltip display
   * @param target An element with [data-tooltip-target="id"] where the tooltip should be shown
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
    return this.host.matches(':where(:popover-open, .popover-open)');
  }

  /**
   * Start or stop auto updates based on tooltip events.
   * Tooltips can be closed or opened with other methods than class members,
   * therefore listening to the toggle event is safer for cleaning up.
   * @param e ToggleEvent
   */
  private handleToggle(e: ToggleEvent) {
    this.toggleTimeoutId = window.setTimeout(() => (this.toggleTimeoutId = null), 10);

    const isOpen = e.newState === 'open';
    if (isOpen) {
      this.startAutoupdates();
      if (this.safeSpace)
        window.addEventListener('mousemove', this.mouseTrackingHandler.bind(this));
    } else {
      if (typeof this.clearAutoUpdate === 'function') this.clearAutoUpdate();
      if (this.safeSpace)
        window.removeEventListener('mousemove', this.mouseTrackingHandler.bind(this));
    }
    this.postToggle.emit(isOpen);
  }

  /**
   * Start listening for DOM updates, scroll events etc. that have
   * an influence on tooltip positioning
   */
  private startAutoupdates() {
    this.clearAutoUpdate = autoUpdate(
      this.eventTarget,
      this.host,
      this.calculatePosition.bind(this),
    );
  }

  private async calculatePosition() {
    const { x, y, middlewareData, placement } = await this.computeMainPosition();
    const currentPlacement = placement.split('-')[0];

    // Position popover
    this.host.style.left = `${x}px`;
    this.host.style.top = `${y}px`;

    // Position arrow if enabled
    if (this.arrow && middlewareData.arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow;
      const staticSide = PostPopovercontainer.STATIC_SIDES[currentPlacement];

      if (staticSide) {
        Object.assign(this.arrowRef.style, {
          left: arrowX ? `${arrowX}px` : '',
          top: arrowY ? `${arrowY}px` : '',
          [staticSide]: '-7px',
        });
      }
    }

    // Handle safe space if enabled
    if (this.safeSpace && this.eventTarget) {
      await this.updateSafeSpaceBoundaries(currentPlacement);
    }
  }

  private async computeMainPosition() {
    const gap = this.edgeGap;
    const middleware = [
      flip(),
      inline(),
      shift({
        padding: gap,
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
      offset(this.arrow ? gap + 4 : gap),
    ];

    if (this.arrow) {
      middleware.push(arrow({ element: this.arrowRef, padding: gap }));
    }

    return computePosition(this.eventTarget, this.host, {
      placement: this.placement || 'top',
      strategy: 'fixed',
      middleware,
    });
  }

  private async updateSafeSpaceBoundaries(currentPlacement: string) {
    const targetRect = this.eventTarget.getBoundingClientRect();
    const popoverRect = this.host.getBoundingClientRect();

    const isVertical = currentPlacement === 'top' || currentPlacement === 'bottom';

    // Helper function to get positioning data based on placement
    const getPositioningData = (placement: string, popoverRect: DOMRect, targetRect: DOMRect) => {
      if (placement === 'top' || placement === 'bottom') {
        return {
          popover: {
            y: placement === 'top' ? popoverRect.bottom : popoverRect.top,
            xStart: popoverRect.left,
            xEnd: popoverRect.right,
          },
          trigger: {
            y: placement === 'top' ? targetRect.top : targetRect.bottom,
            xStart: targetRect.left,
            xEnd: targetRect.right,
          },
        };
      } else {
        // left or right
        return {
          popover: {
            x: placement === 'left' ? popoverRect.right : popoverRect.left,
            yStart: popoverRect.top,
            yEnd: popoverRect.bottom,
          },
          trigger: {
            x: placement === 'left' ? targetRect.left : targetRect.right,
            yStart: targetRect.top,
            yEnd: targetRect.bottom,
          },
        };
      }
    };

    const posData = getPositioningData(currentPlacement, popoverRect, targetRect);

    // Clear previous values
    PostPopovercontainer.PROPERTIES_TO_CLEAR.forEach(prop => {
      this.host.style.removeProperty(prop);
    });

    if (isVertical) {
      // For top/bottom placement
      this.host.style.setProperty('--safe-space-popover-y', `${posData.popover.y}px`);
      this.host.style.setProperty('--safe-space-popover-x-start', `${posData.popover.xStart}px`);
      this.host.style.setProperty('--safe-space-popover-x-end', `${posData.popover.xEnd}px`);
      this.host.style.setProperty('--safe-space-trigger-y', `${posData.trigger.y}px`);
      this.host.style.setProperty('--safe-space-trigger-x-start', `${posData.trigger.xStart}px`);
      this.host.style.setProperty('--safe-space-trigger-x-end', `${posData.trigger.xEnd}px`);
    } else {
      // For left/right placement
      this.host.style.setProperty('--safe-space-popover-x', `${posData.popover.x}px`);
      this.host.style.setProperty('--safe-space-popover-y-start', `${posData.popover.yStart}px`);
      this.host.style.setProperty('--safe-space-popover-y-end', `${posData.popover.yEnd}px`);
      this.host.style.setProperty('--safe-space-trigger-x', `${posData.trigger.x}px`);
      this.host.style.setProperty('--safe-space-trigger-y-start', `${posData.trigger.yStart}px`);
      this.host.style.setProperty('--safe-space-trigger-y-end', `${posData.trigger.yEnd}px`);
    }
  }

  render() {
    return (
      <Host data-version={version} popover={this.manualClose ? 'manual' : 'auto'}>
        <div>
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
