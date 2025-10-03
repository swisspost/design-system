import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  h,
  Watch,
} from '@stencil/core';

import { IS_BROWSER, checkEmptyOrOneOf, checkEmptyOrType } from '@/utils';
import { version } from '@root/package.json';

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
import { PLACEMENT_TYPES } from '@/types';

// Polyfill for popovers, can be removed when https://caniuse.com/?search=popover is green
import { apply, isSupported } from '@oddbird/popover-polyfill/fn';
import { popIn } from '@/animations/pop-in';

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
    '--post-safe-space-popover-x',
    '--post-safe-space-popover-y',
    '--post-safe-space-popover-x-start',
    '--post-safe-space-popover-x-end',
    '--post-safe-space-popover-y-start',
    '--post-safe-space-popover-y-end',
    '--post-safe-space-trigger-x',
    '--post-safe-space-trigger-y',
    '--post-safe-space-trigger-x-start',
    '--post-safe-space-trigger-x-end',
    '--post-safe-space-trigger-y-start',
    '--post-safe-space-trigger-y-end',
  ] as const;

  @Element() host: HTMLPostPopovercontainerElement;
  private arrowRef: HTMLElement;
  private eventTarget: Element;
  private clearAutoUpdate: () => void;
  private toggleTimeoutId: number;
  private firstOpen: boolean = true;

  /**
   * Fires whenever the popovercontainer gets shown or hidden, passing in event.detail an object containing two booleans: `isOpen`, which is true if the popovercontainer was opened and false if it was closed, and `first`, which is true if it was opened for the first time.
   */
  @Event() postToggle: EventEmitter<{ isOpen: boolean; first?: boolean }>;

  /**
   * Defines the placement of the popovercontainer according to the floating-ui options available at https://floating-ui.com/docs/computePosition#placement.
   * Popovercontainers are automatically flipped to the opposite side if there is not enough available space and are shifted
   * towards the viewport if they would overlap edge boundaries.
   */
  @Prop() readonly placement?: Placement = 'top';

  /**
   * Gap between the edge of the page and the popovercontainer
   */
  @Prop() readonly edgeGap?: number = 8;

  /**
   * Animation style
   */
  @Prop() readonly animation?: 'pop-in' | null = null;

  /**
   * Whether or not to display a little pointer arrow
   */
  @Prop() readonly arrow?: boolean = false;

  /**
   * Whether or not the popovercontainer should close when user clicks outside of it
   */
  @Prop() manualClose: boolean = false;

  /**
   * Enables a safespace through which the cursor can be moved without the popover being disabled
   */
  @Prop({ reflect: true }) readonly safeSpace?: 'triangle' | 'trapezoid';
  @Watch('placement')
  validatePlacement() {
    checkEmptyOrOneOf(this, 'placement', PLACEMENT_TYPES);
  }

  @Watch('edgeGap')
  validateEdgeGap() {
    checkEmptyOrType(this, 'edgeGap', 'number');
  }

  @Watch('safeSpace')
  validateSafeSpace() {
    checkEmptyOrOneOf(this, 'safeSpace', ['triangle', 'trapezoid']);
  }

  /**
   * Updates cursor position for safe space feature when popover is open.
   * Sets CSS custom properties for dynamic styling of safe area.
   * @param event MouseEvent with cursor position
   */
  private mouseTrackingHandler(event: MouseEvent) {
    this.host.style.setProperty('--post-safe-space-cursor-x', `${event.clientX}px`);
    this.host.style.setProperty('--post-safe-space-cursor-y', `${event.clientY}px`);
  }

  connectedCallback() {
    if (IS_BROWSER && !isSupported()) {
      apply();
    }
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
   * Programmatically display the popovercontainer
   * @param target An element with [data-popover-target="id"] where the popovercontainer should be shown
   */
  @Method()
  async show(target: HTMLElement) {
    if (this.toggleTimeoutId) return;

    this.eventTarget = target;
    this.calculatePosition();
    this.host.showPopover();
  }

  /**
   * Programmatically hide the popovercontainer
   */
  @Method()
  async hide() {
    if (!this.toggleTimeoutId) {
      this.eventTarget = null;
      this.host.hidePopover();
    }
  }

  /**
   * Toggle popovercontainer display
   * @param target An element with [data-popover-target="id"] where the popovercontainer should be shown
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
   * Start or stop auto updates based on popovercontainer events.
   * Popovercontainers can be closed or opened with other methods than class members,
   * therefore listening to the toggle event is safer for cleaning up.
   * @param e ToggleEvent
   */
  private handleToggle(e: ToggleEvent) {
    this.toggleTimeoutId = window.setTimeout(() => (this.toggleTimeoutId = null), 10);

    const isOpen = e.newState === 'open';
    if (isOpen) {
      const content = this.host.querySelector('.popover-content');
      this.startAutoupdates();
      if (content && this.animation === 'pop-in') {
        popIn(content);
      }

      if (this.safeSpace)
        window.addEventListener('mousemove', this.mouseTrackingHandler.bind(this));

      // Emit event with `first` flag only true on the first open
      if (this.firstOpen) {
        this.postToggle.emit({ isOpen, first: this.firstOpen });
        this.firstOpen = false;
        return;
      }
    } else {
      if (typeof this.clearAutoUpdate === 'function') this.clearAutoUpdate();
      if (this.safeSpace)
        window.removeEventListener('mousemove', this.mouseTrackingHandler.bind(this));
    }
    this.postToggle.emit({ isOpen: isOpen, first: false });
  }

  /**
   * Start listening for DOM updates, scroll events etc. that have
   * an influence on popovercontainer positioning
   */
  private startAutoupdates() {
    this.clearAutoUpdate = autoUpdate(
      this.eventTarget,
      this.host,
      this.calculatePosition.bind(this),
    );
  }

  /**
   * Retrieves the dynamic height of the header
   */
  private getHeaderHeight(): number {
    const header = document.querySelector('post-header');
    return header ? parseFloat(getComputedStyle(header).height) : 0;
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
          [staticSide]: '-5px',
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
      flip({
        padding: this.getHeaderHeight(),
      }),
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
      this.host.style.setProperty('--post-safe-space-popover-y', `${posData.popover.y}px`);
      this.host.style.setProperty(
        '--post-safe-space-popover-x-start',
        `${posData.popover.xStart}px`,
      );
      this.host.style.setProperty('--post-safe-space-popover-x-end', `${posData.popover.xEnd}px`);
      this.host.style.setProperty('--post-safe-space-trigger-y', `${posData.trigger.y}px`);
      this.host.style.setProperty(
        '--post-safe-space-trigger-x-start',
        `${posData.trigger.xStart}px`,
      );
      this.host.style.setProperty('--post-safe-space-trigger-x-end', `${posData.trigger.xEnd}px`);
    } else {
      // For left/right placement
      this.host.style.setProperty('--post-safe-space-popover-x', `${posData.popover.x}px`);
      this.host.style.setProperty(
        '--post-safe-space-popover-y-start',
        `${posData.popover.yStart}px`,
      );
      this.host.style.setProperty('--post-safe-space-popover-y-end', `${posData.popover.yEnd}px`);
      this.host.style.setProperty('--post-safe-space-trigger-x', `${posData.trigger.x}px`);
      this.host.style.setProperty(
        '--post-safe-space-trigger-y-start',
        `${posData.trigger.yStart}px`,
      );
      this.host.style.setProperty('--post-safe-space-trigger-y-end', `${posData.trigger.yEnd}px`);
    }
  }

  render() {
    return (
      <Host data-version={version} popover={this.manualClose ? 'manual' : 'auto'}>
        <div class="popover-content">
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
