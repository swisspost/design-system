import { Component, Element, Prop, h, Host, Watch } from '@stencil/core';
import { checkEmptyOrType, IS_BROWSER } from '@/utils';
import { version } from '@root/package.json';
import isFocusable from 'ally.js/is/focusable';

const MOBILE_TRIGGER_EVENTS = ['long-press', 'touchend'];
const DESKTOP_TRIGGER_EVENTS = ['pointerenter', 'pointerleave', 'focusin', 'focusout'];

if (IS_BROWSER) {
  (async () => {
    await import('long-press-event');
  })();
}

/**
 * @slot default - Content to trigger the tooltip. Can contain any focusable element or will be made focusable automatically.
 */
@Component({
  tag: 'post-tooltip-trigger',
  styleUrl: 'post-tooltip-trigger.scss',
  shadow: true,
})
export class PostTooltipTrigger {
  @Element() host: HTMLPostTooltipTriggerElement;

  /**
   * ID of the tooltip element that this trigger is linked to.
   */
  @Prop({ reflect: true }) for!: string;

  /**
   * Delay (in milliseconds) before the tooltip is shown.
   */
  @Prop() delay: number = 0;

  /**
   * Reference to the element inside the host that will act as the trigger.
   */
  private trigger: HTMLElement | null = null;

  /**
   * Timeout ID for the delay.
   */
  private delayTimeout: number | null = null;

  /**
   * Bound event handlers for proper removal
   */
  private boundTriggerHandler: (event: Event) => void;
  private boundTooltipHandler: (event: PointerEvent) => void;

  /**
   * Detect if device has touch capability
   */
  private get isMobileDevice(): boolean {
    return IS_BROWSER && 'ontouchstart' in window;
  }

  constructor() {
    this.boundTriggerHandler = this.handleTriggerEvent.bind(this);
    this.boundTooltipHandler = this.handleTooltipEvent.bind(this);
  }

  @Watch('for')
  validateControlFor() {
    checkEmptyOrType(this, 'for', 'string');
  }

  private get tooltip(): HTMLPostTooltipElement | null {
    if (!IS_BROWSER) return null;

    const ref = document.getElementById(this.for);
    return ref?.localName === 'post-tooltip' ? (ref as HTMLPostTooltipElement) : null;
  }

  componentDidLoad() {
    this.setupTrigger();
    this.attachListeners();
    this.attachTooltipListeners();
  }

  disconnectedCallback() {
    this.removeListeners();
    this.removeTooltipListeners();
    this.cleanupTrigger();

    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
      this.delayTimeout = null;
    }
  }

  private handleSlotChange() {
    this.cleanupTrigger();
    this.setupTrigger();
  }

  private cleanupTrigger() {
    if (this.trigger) {
      const describedBy = this.trigger.getAttribute('aria-describedby') || '';
      if (describedBy.includes(this.for)) {
        const newDescribedBy = describedBy
          .split(' ')
          .filter(id => id !== this.for)
          .join(' ');

        if (newDescribedBy) {
          this.trigger.setAttribute('aria-describedby', newDescribedBy);
        } else {
          this.trigger.removeAttribute('aria-describedby');
        }
      }

      this.trigger = null;
    }
  }

  private setupTrigger() {
    this.trigger = this.host.querySelector('*');

    if (this.trigger) {
      if (!isFocusable(this.trigger)) {
        this.trigger.setAttribute('tabindex', '0');
      }

      const describedBy = this.trigger.getAttribute('aria-describedby') || '';
      if (!describedBy.includes(this.for)) {
        this.trigger.setAttribute('aria-describedby', `${describedBy} ${this.for}`.trim());
      }
    } else {
      console.warn(
        'No content found in the post-tooltip-trigger slot. Please insert a focusable element or content that can receive focus.',
      );
    }
  }

  private attachListeners() {
    const events = this.isMobileDevice ? MOBILE_TRIGGER_EVENTS : DESKTOP_TRIGGER_EVENTS;
    
    events.forEach(event => {
      this.host.addEventListener(event, this.boundTriggerHandler);
    });
  }

  private removeListeners() {
    // Remove both sets of events to ensure cleanup
    [...MOBILE_TRIGGER_EVENTS, ...DESKTOP_TRIGGER_EVENTS].forEach(event => {
      this.host.removeEventListener(event, this.boundTriggerHandler);
    });
  }

  private attachTooltipListeners() {
    if (this.tooltip && !this.isMobileDevice) {
      this.tooltip.addEventListener('pointerenter', this.boundTooltipHandler);
      this.tooltip.addEventListener('pointerleave', this.boundTooltipHandler);
    }
  }

  private removeTooltipListeners() {
    if (this.tooltip) {
      this.tooltip.removeEventListener('pointerenter', this.boundTooltipHandler);
      this.tooltip.removeEventListener('pointerleave', this.boundTooltipHandler);
    }
  }

  private handleTriggerEvent(event: Event) {
    if (this.isMobileDevice) {
      // Mobile: only respond to long-press
      switch (event.type) {
        case 'long-press':
          this.handleEnter();
          break;
        case 'touchend':
          this.handleLeave(event as PointerEvent);
          break;
      }
    } else {
      // Desktop: respond to hover and focus
      switch (event.type) {
        case 'pointerenter':
        case 'focusin':
          this.handleEnter();
          break;
        case 'pointerleave':
        case 'focusout':
          this.handleLeave(event as PointerEvent);
          break;
      }
    }
  }

  private handleTooltipEvent(event: PointerEvent) {
    // Tooltip hover only works on desktop
    if (this.isMobileDevice) return;

    switch (event.type) {
      case 'pointerenter':
        this.handleEnter();
        break;
      case 'pointerleave':
        this.handleLeave(event);
        break;
    }
  }

  private handleEnter() {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
      this.delayTimeout = null;
    }
    this.interestHandler();
  }

  private handleLeave(event: PointerEvent) {
    // On mobile, always close tooltip on touchend
    if (this.isMobileDevice) {
      this.interestLostHandler();
      return;
    }

    // Desktop: check if moving to tooltip
    const newTarget = event.relatedTarget as HTMLElement | null;

    if (
      (this.tooltip && newTarget && this.tooltip.contains(newTarget)) ||
      newTarget === this.trigger
    ) {
      return;
    }

    this.interestLostHandler();
  }

  private interestHandler() {
    if (this.trigger) {
      if (this.delay > 0) {
        this.delayTimeout = window.setTimeout(() => {
          this.tooltip?.show(this.trigger);
          this.delayTimeout = null;
        }, this.delay);
      } else {
        this.tooltip?.show(this.trigger);
      }
    }
  }

  private interestLostHandler() {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
      this.delayTimeout = null;
    }
    this.tooltip?.hide();
  }

  render() {
    return (
      <Host data-version={version}>
        <slot onSlotchange={() => this.handleSlotChange()}></slot>
      </Host>
    );
  }
}
