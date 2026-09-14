import { version } from '@root/package.json';
import {
  Build,
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
} from '@stencil/core';
import { popIn } from '@/animations/pop-in';
import { PLACEMENT_TYPES } from '@/types';
import { OneOf, Type } from '@/utils';
import {
  arrow,
  autoUpdate,
  flip,
  hide,
  inline,
  limitShift,
  Placement,
  shift,
  size,
  offset,
} from '@floating-ui/dom';
import { getOverflowAncestors } from '@floating-ui/utils/dom';
import { computePositionWithSafeArea } from '@/utils/floating-ui';
import { oppositeSide, Side } from '@/utils/side';

// Polyfill for popovers, can be removed when https://caniuse.com/?search=popover is green
import { apply, isSupported } from '@oddbird/popover-polyfill/fn';

/**
 * @slot - Default slot for placing content inside the popover.
 */
@Component({
  tag: 'post-popovercontainer',
  styleUrl: 'post-popovercontainer.scss',
  shadow: true,
})
export class PostPopovercontainer {
  /** The element the popover is anchored to */
  private anchorRef: HTMLElement | null = null;
  private arrowRef: HTMLElement | null = null;

  private hasBeenOpened: boolean = false;
  private toggleTimeoutId: ReturnType<typeof globalThis.setTimeout> | null = null;

  private runningAnimation: Animation | null = null;

  private stopAutoUpdate: VoidFunction | null = null;
  private mouseMoveHandler: (event: MouseEvent) => void = null;

  @Element() host: HTMLPostPopovercontainerElement;

  /**
   * Emitted just before the popover is shown.
   *
   * The payload contains a `first` boolean, that is set to `true` when the popover is about to be
   * shown for the first time.
   */
  @Event() postBeforeShow: EventEmitter<{ first?: boolean }>;

  /**
   * Emitted just after the popover is shown.
   *
   * The payload contains a `first` boolean, that is set to `true` when the popover is shown for the
   * first time.
   */
  @Event() postShow: EventEmitter<{ first?: boolean }>;

  /**
   * Emitted just after the popover is hidden.
   */
  @Event() postHide: EventEmitter;

  /**
   * Emitted just before the popover's state changes.
   *
   * The payload contains a `willOpen` boolean, that is set to `true` when the popover is about to
   * be shown, `false` when it is about to be hidden.
   */
  @Event() postBeforeToggle: EventEmitter<{ willOpen: boolean }>;

  /**
   * Emitted just after the popover's state changes.
   *
   * The payload contains a `isOpen` boolean, that is set to `true` when the popover is shown,
   * `false` when it is hidden.
   */
  @Event() postToggle: EventEmitter<{ isOpen: boolean }>;

  /**
   * Placement of the popover according to the floating-ui options.
   */
  @Prop()
  @OneOf(PLACEMENT_TYPES)
  readonly placement?: Placement = 'top';

  /**
   * Gap between the edge of the viewport and the popover.
   */
  @Prop()
  @Type('number')
  readonly edgeGap?: number = 8;

  /**
   * Offset for more precise placement
   */
  @Prop() readonly offset?: number;

  /**
   * Show a little indicator arrow
   */
  @Prop() readonly arrow?: boolean = false;

  /**
   * Safe space through which the mouse can move without the popover being hidden.
   */
  @Prop({ reflect: true })
  @OneOf(['triangle', 'trapezoid'])
  readonly safeSpace?: 'triangle' | 'trapezoid';

  /**
   * Whether to automatically hide the popover when the target moves outside the scrollport.
   *
   * If the `post-header` can cover the target, the popover will also be hidden as soon as the
   * target scrolls behind it.
   */
  @Prop() readonly autoHide?: boolean;

  /**
   * Whether to lock the scroll of the scrollport when the popover is shown.
   */
  @Prop() readonly scrollLock?: boolean;

  @State() side: Side;

  connectedCallback() {
    if (Build.isBrowser && !isSupported()) {
      apply();
    }
  }

  componentDidLoad() {
    this.host.addEventListener('beforetoggle', this.handleToggle.bind(this));
  }

  disconnectedCallback() {
    this.stopAutoUpdate?.();
    this.unlockScroll();
    this.host.removeEventListener('beforetoggle', this.handleToggle.bind(this));
  }

  private isOpen() {
    return this.host?.matches(':where(:popover-open, .popover-open)');
  }

  /**
   * Shows the popover.
   * @param anchor the element that the popover is visually anchored to.
   */
  @Method()
  async show(anchor: HTMLElement) {
    if (this.toggleTimeoutId || !anchor || this.isOpen()) return;

    this.anchorRef = anchor;
    this.host.showPopover();
  }

  /**
   * Hides the popover.
   */
  @Method()
  async hide() {
    if (this.toggleTimeoutId || !this.isOpen()) return;

    this.anchorRef = null;
    this.host.hidePopover();
    this.postHide.emit();
  }

  /**
   * Toggles the popover's state from hidden to showing and vice versa.
   *
   * If `state` is specified, the popover is forced to be shown if the is set to `true`, or hidden
   * if it is set to `false`.
   *
   * @param anchor the element that the popover is visually anchored to.
   * @param force the next state of the popover.
   * @returns the new state of the popover: `true` if it is shown, `false` if it is hidden.
   */
  @Method()
  async toggle(anchor: HTMLElement, force?: boolean): Promise<boolean> {
    const isOpen = this.isOpen();
    if (!this.host || !anchor || this.toggleTimeoutId) return isOpen;

    const shouldOpen = force === true || (force === undefined && !isOpen);
    if (isOpen === shouldOpen) return isOpen;

    this.anchorRef = anchor;
    this.host.togglePopover(force);
    this.toggleTimeoutId = null;

    return this.isOpen();
  }

  private async handleToggle(event: ToggleEvent) {
    this.toggleTimeoutId = globalThis.setTimeout(() => (this.toggleTimeoutId = null), 10);

    if (event.newState === 'open') await this.handleOpen();
    else await this.handleClose();
  }

  /**
   * Handles the popover's state transition from hidden to showing, emitting related events.
   */
  private async handleOpen() {
    if (this.scrollLock) this.lockScroll();

    this.postBeforeToggle.emit({ willOpen: true });
    this.postBeforeShow.emit({ first: !this.hasBeenOpened });

    await this.updatePosition(true);
    this.startAutoUpdate();

    try {
      await this.runOpenAnimation();
    } catch {
      return;
    }

    this.postToggle.emit({ isOpen: true });
    this.postShow.emit({ first: !this.hasBeenOpened });
    this.hasBeenOpened = true;
  }

  private async runOpenAnimation() {
    const content = this.host.shadowRoot.querySelector('[part="post-popovercontainer-content"]');
    if (!content) return;

    this.runningAnimation = popIn(content);
    await this.runningAnimation.finished;
  }

  /**
   * Handles the popover's state transition from showing to hidden, emitting related events.
   */
  private async handleClose() {
    this.stopAutoUpdate?.();
    this.unlockScroll();

    if (this.mouseMoveHandler) {
      globalThis.removeEventListener('mousemove', this.mouseMoveHandler);
      this.mouseMoveHandler = null;
    }

    if (this.runningAnimation) {
      this.runningAnimation.cancel();
      this.runningAnimation = null;
    }

    this.postBeforeToggle.emit({ willOpen: false });
    this.postToggle.emit({ isOpen: false });
    this.postHide.emit();
  }

  private startAutoUpdate() {
    if (!this.host || !this.anchorRef) return;
    this.stopAutoUpdate = autoUpdate(this.anchorRef, this.host, this.updatePosition.bind(this));
  }

  private async updatePosition(withSize: boolean = false) {
    const { x, y, middlewareData, placement } = await this.computePosition(withSize);

    // Hide the popover if the target is outside the viewport
    if (middlewareData.hide?.referenceHidden) {
      this.host.hidePopover();
      return;
    }

    this.side = placement.split('-')[0] as Side;

    // Position the popover
    this.host.style.left = `${x}px`;
    this.host.style.top = `${y}px`;

    // Position the arrow
    if (this.arrow && middlewareData.arrow) {
      const data = middlewareData.arrow;

      this.arrowRef.style.left = data.x ? `${data.x}px` : '';
      this.arrowRef.style.top = data.y ? `${data.y}px` : '';
      this.arrowRef.style[oppositeSide(this.side)] = `-${this.arrowRef.offsetWidth / 2}px`;
    }
  }

  private async computePosition(withSize: boolean) {
    const gap = this.edgeGap ?? 0;

    const isAligned = this.placement?.includes('-');
    const isVertical = this.placement?.startsWith('left') || this.placement?.startsWith('right');

    const flipMiddleware = [
      // Flip the popover if the anchor moves outside the viewport
      flip({ elementContext: 'reference', crossAxis: false, fallbackStrategy: 'bestFit' }),
      // Flip the popover if the popover itself moves outside the viewport
      flip({ elementContext: 'floating', crossAxis: false, fallbackStrategy: 'bestFit' }),
    ];

    const shiftMiddleware = shift({
      padding: gap,
      limiter: limitShift({ offset: 32 }),
    });

    const middleware = [
      offset(this.offset ?? (this.arrow ? gap + 4 : gap)),
      inline(),
      // Per Floating UI docs: for aligned placements (e.g. bottom-end), flip should come before shift.
      ...(isAligned ? [...flipMiddleware, shiftMiddleware] : [shiftMiddleware, ...flipMiddleware]),
    ];

    if (withSize) {
      middleware.push(
        size({
          apply({ availableWidth, availableHeight, elements }) {
            elements.floating.style.setProperty(
              '--post-popovercontainer-available-width',
              `${availableWidth - (isVertical ? gap : gap * 2)}px`,
            );
            elements.floating.style.setProperty(
              '--post-popovercontainer-available-height',
              `${availableHeight - (isVertical ? gap * 2 : gap)}px`,
            );
          },
        }),
      );
    }

    if (this.arrow) {
      middleware.push(arrow({ element: this.arrowRef, padding: gap }));
    }

    // Automatically hide the popover if the target moves outside the scrollport.
    if (this.autoHide) {
      // Per Floating UI docs: hide should generally be placed at the end.
      middleware.push(hide({ strategy: 'referenceHidden' }));
    }

    return computePositionWithSafeArea(this.anchorRef, this.host, {
      placement: this.placement || 'top',
      strategy: 'fixed',
      middleware,
    });
  }

  private lockScroll() {
    for (const ancestor of getOverflowAncestors(this.host)) {
      let target: HTMLElement;

      if (ancestor instanceof HTMLElement) target = ancestor;
      else if (ancestor instanceof Window) target = ancestor.document.documentElement;
      else continue;

      target.dataset['postPopovercontainerScrollLock'] = '';
    }
  }

  private unlockScroll() {
    document
      .querySelectorAll<HTMLElement>('[data-post-popovercontainer-scroll-lock]')
      .forEach(element => {
        delete element.dataset['postPopovercontainerScrollLock'];
      });
  }

  render() {
    return (
      <Host data-version={version} popover="auto">
        <div part="post-popovercontainer-content">
          {this.arrow && (
            <span data-side={this.side} class="arrow" ref={el => (this.arrowRef = el)}></span>
          )}
          {/* exposed via ::part for consuming components to activate as a bleed mask */}
          <span part="post-popovercontainer-border-mask"></span>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
