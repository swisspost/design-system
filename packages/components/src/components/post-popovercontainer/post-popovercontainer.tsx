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
  State,
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
import { popIn, popOut } from '@/animations/pop';

interface PopoverElement {
  showPopover: () => void;
  hidePopover: () => void;
  togglePopover: (force?: boolean) => boolean;
}

const ANIMATIONS = {
  pop: { open: popIn, close: popOut },
} as const;

export type AnimationName = keyof typeof ANIMATIONS;

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
  private hasOpenedOnce: boolean = true;

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
  @Prop() readonly animation?: AnimationName | null = null;

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

  @State() dynamicPlacement?: string;

  /**
   * Fires whenever the popovercontainer is about to be shown, passing in event.detail a `first` boolean, which is true if it is to be shown for the first time.
   */
  @Event() postBeforeShow: EventEmitter<{ first?: boolean }>;

  /**
   * Fires whenever the popovercontainer is shown, passing in event.detail a `first` boolean, which is true if it is shown for the first time.
   */
  @Event() postShow: EventEmitter<{ first?: boolean }>;

  /**
   * Fires whenever the popovercontainer is about to be hidden.
   */
  @Event() postBeforeHide: EventEmitter;

  /**
   * Fires whenever the popovercontainer is hidden.
   */
  @Event() postHide: EventEmitter;

  /**
   * Fires whenever the popovercontainer is about to be shown or hidden, passing in event.detail a `willOpen` boolean, which is true if the popovercontainer is about to be opened and false if it is about to be closed.
   */
  @Event() postBeforeToggle: EventEmitter<{ willOpen: boolean }>;

  /**
   * Fires whenever the popovercontainer gets shown or hidden, passing in event.detail an object containing a `isOpen`boolean, which is true if the popovercontainer was opened and false if it was closed.
   */
  @Event() postToggle: EventEmitter<{ isOpen: boolean }>;

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

  @Watch('animation')
  validateAnimation() {
    checkEmptyOrOneOf(this, 'animation', Object.keys(ANIMATIONS));
  }

  /** The popovercontainer content */
  private contentEl: HTMLElement;

  /** Used to cancel already running animations */
  private currentOpenAnimation: Animation | null = null;
  private currentClosingAnimation: Animation | null = null;

  /**
   * Updates cursor position for safe space feature when popover is open.
   * Sets CSS custom properties for dynamic styling of safe area.
   * @param event MouseEvent with cursor position
   */
  private mouseTrackingHandler(event: MouseEvent) {
    this.host.style.setProperty('--post-safe-space-cursor-x', `${event.clientX}px`);
    this.host.style.setProperty('--post-safe-space-cursor-y', `${event.clientY}px`);
  }

  /**
   * Programmatically display the popovercontainer
   * @param target A focusable element inside the trigger component that controls the popover
   */
  @Method()
  async show(target: HTMLElement) {
    this.eventTarget = target;
    if (!this.toggleTimeoutId) {
      this.toggleTimeoutId = window.setTimeout(() => (this.toggleTimeoutId = null), 10);
      this.calculatePosition();
      this.host.showPopover();
    }
  }

  /**
   * Programmatically hide the popovercontainer
   */
  @Method()
  async hide() {
    if (!this.toggleTimeoutId) {
      this.toggleTimeoutId = window.setTimeout(() => (this.toggleTimeoutId = null), 10);
      this.calculatePosition();
      await this.close();
      this.host.hidePopover();
    }
  }

  /**
   * Toggle popovercontainer display
   * @param target A focusable element inside the trigger component that controls the popover
   * @param force Pass true to always show or false to always hide
   */
  @Method()
  async toggle(target: HTMLElement, force?: boolean): Promise<boolean> {
    this.eventTarget = target;
    // Prevent instant double toggle
    if (!this.toggleTimeoutId) {
      this.toggleTimeoutId = window.setTimeout(() => (this.toggleTimeoutId = null), 10);
      this.calculatePosition();
      // Run an toggle actions or animations before popover API actually toggles the popover
      if (!force) await this.close();
      this.host.togglePopover(force);
    }
    return this.host.matches(':where(:popover-open, .popover-open)');
  }

  connectedCallback() {
    if (IS_BROWSER && !isSupported()) {
      apply();
    }
    /** Listens to the popoverApi 'beforeToggle' event */
    this.host.addEventListener('beforetoggle', this.beforeOpenHandler);
  }

  disconnectedCallback() {
    if (typeof this.clearAutoUpdate === 'function') {
      this.clearAutoUpdate();
    }
    this.host.removeEventListener('beforetoggle', this.beforeOpenHandler);
  }

  private boundMouseTrackingHandler = this.mouseTrackingHandler.bind(this);

  /**
   *  Handles the pre-open phase of the popover
   * @param e ToggleEvent
   */
  private beforeOpenHandler = async (event: ToggleEvent) => {
    if (event.newState === 'open') {
      await this.open();
    }
  };

  /**
   * Handles the popover opening process and emits related events.
   */
  private async open() {
    this.startAutoupdates();
    if (this.contentEl) {
      if (this.animation === null) {
        // No animation
        this.postBeforeToggle.emit({ willOpen: true });
        this.postBeforeShow.emit({ first: this.hasOpenedOnce });
        this.postToggle.emit({ isOpen: true });
        this.postShow.emit({ first: this.hasOpenedOnce });
        if (this.hasOpenedOnce) this.hasOpenedOnce = false;
      } else {
        // Cancel any runninc closing animation
        if (this.currentClosingAnimation) {
          this.currentClosingAnimation.cancel();
          this.currentClosingAnimation = null;
        }
        // Run open animation
        const animationFn = ANIMATIONS[this.animation].open;
        await this.runOpenAnimation(animationFn, this.contentEl);
      }
    }
    if (this.safeSpace) {
      window.addEventListener('mousemove', this.boundMouseTrackingHandler);
    }
  }

  /**
   * Handles the popover closing process and emits related events.
   */
  private async close() {
    if (typeof this.clearAutoUpdate === 'function') {
      this.clearAutoUpdate();
    }
    // No animation
    if (this.animation === null) {
      this.postBeforeToggle.emit({ willOpen: false });
      this.postToggle.emit({ isOpen: false });
      this.postBeforeHide.emit();
      this.postHide.emit();
    } else {
      // Cancel any runninc open animation
      if (this.currentOpenAnimation) {
        this.currentOpenAnimation.cancel();
        this.currentOpenAnimation = null;
      }
      // Run closing animation
      if (this.contentEl) {
        const animationFn = ANIMATIONS[this.animation].close;
        await this.runCloseAnimation(animationFn, this.contentEl);
      }
    }

    if (this.safeSpace) {
      window.removeEventListener('mousemove', this.boundMouseTrackingHandler);
    }
  }

  /**
   * Runs the opening animation of the popovercontainer and emits the toggle/show/hide events in the correct timing
   */
  private async runOpenAnimation(
    animationFn: (el: HTMLElement) => Animation | undefined,
    element: HTMLElement,
  ) {
    const animation = animationFn(element);
    try {
      this.currentOpenAnimation = animation;

      // Animation has started running → emit BEFORE events
      if (animation.playState === 'running') {
        this.postBeforeToggle.emit({ willOpen: true });
        this.postBeforeShow.emit({ first: this.hasOpenedOnce });
      }

      await animation.finished;

      this.postToggle.emit({ isOpen: true });
      this.postShow.emit({ first: this.hasOpenedOnce });

      this.hasOpenedOnce = true;
    } catch (err) {
      console.warn('Open Animation failed or was interrupted:', err);
      // Reset all states to closing
      this.postBeforeToggle.emit({ willOpen: false });
      this.postBeforeShow.emit({ first: this.hasOpenedOnce });
      this.postToggle.emit({ isOpen: false });
      this.postShow.emit({ first: this.hasOpenedOnce });
    } finally {
      if (this.currentOpenAnimation === animation) {
        this.currentOpenAnimation = null;
      }
    }
  }

  /**
   * Runs the closing animation the popovercontainer and emits the toggle/show/hide events in the correct timing
   */

  private async runCloseAnimation(
    animationFn: (el: HTMLElement) => Animation | undefined,
    element: HTMLElement,
  ) {
    const animation = animationFn(element);

    try {
      this.currentClosingAnimation = animation;

      // Animation has started running → emit BEFORE events
      if (animation.playState === 'running') {
        this.postBeforeToggle.emit({ willOpen: false });
        this.postBeforeHide.emit();
      }

      // Wait for animation to finish
      await animation.finished;

      this.postToggle.emit({ isOpen: false });
      this.postHide.emit();
    } catch (err) {
      console.warn('Close animation failed or was interrupted:', err);
      // Still complete closing
      this.postBeforeToggle.emit({ willOpen: false });
      this.postBeforeHide.emit();
      this.postToggle.emit({ isOpen: false });
      this.postHide.emit();
    } finally {
      // Clean up
      if (this.currentClosingAnimation === animation) {
        this.currentClosingAnimation = null;
      }
    }
  }

  /**
   * Start listening for DOM updates, scroll events etc. that have
   * an influence on popovercontainer positioning
   */
  private startAutoupdates() {
    if (!this.eventTarget || !this.host) return;
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
    this.dynamicPlacement = currentPlacement;
    // Position popover
    this.host.style.left = `${x}px`;
    this.host.style.top = `${y}px`;

    // Position arrow if enabled
    if (this.arrow && middlewareData.arrow) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const staticSide = PostPopovercontainer.STATIC_SIDES[currentPlacement];

      const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize);

      // Calculate dynamically the half side which provides the static side offset
      const arrowSizeValue = getComputedStyle(this.arrowRef)
        .getPropertyValue('--arrow-size')
        .trim();

      const arrowSizePx = arrowSizeValue.endsWith('rem')
        ? Number.parseFloat(arrowSizeValue) * rootFontSize
        : Number.parseFloat(arrowSizeValue);

      const halfSide = -0.5 * arrowSizePx;

      if (staticSide) {
        Object.assign(this.arrowRef.style, {
          left: arrowX ? `${arrowX}px` : '',
          top: arrowY ? `${arrowY}px` : '',
          [staticSide]: `${halfSide}px`,
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
      <Host data-version={version} popover={'manual'}>
        <div class="popover-content" ref={el => (this.contentEl = el as HTMLElement)}>
          {this.arrow && (
            <span
              dynamic-placement={this.dynamicPlacement}
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
