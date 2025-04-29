import { Component, Element, Prop, h, Host, Watch } from '@stencil/core';
import { checkType } from '@/utils';
import { version } from '@root/package.json';
import isFocusable from 'ally.js/is/focusable';

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

  constructor() {
    this.boundTriggerHandler = this.handleTriggerEvent.bind(this);
    this.boundTooltipHandler = this.handleTooltipEvent.bind(this);
  }

  @Watch('for')
  validateControlFor() {
    checkType(
      this,
      'for',
      'string',
      'The "for" property is required and should be a string.'
    );
  }

  private get tooltip(): HTMLPostTooltipElement | null {
    const ref = document.getElementById(this.for);
    return ref && ref.localName === 'post-tooltip'
      ? (ref as HTMLPostTooltipElement)
      : null;
  }

  componentDidLoad() {
    this.host.setAttribute('data-version', version);
    this.setupTrigger();
    this.attachListeners();
    this.attachTooltipListeners();
  }

  disconnectedCallback() {
    this.removeListeners();
    this.removeTooltipListeners();

    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
      this.delayTimeout = null;
    }
  }

  private setupTrigger() {
    this.trigger = this.host.firstElementChild as HTMLElement;

    if (this.trigger) {
      if (!isFocusable(this.trigger)) {
        this.trigger.setAttribute('tabindex', '0');
      }

      const describedBy = this.trigger.getAttribute('aria-describedby') || '';
      if (!describedBy.includes(this.for)) {
        this.trigger.setAttribute('aria-describedby', `${describedBy} ${this.for}`.trim());
      }
    } else {
      console.warn('No light DOM element found within post-tooltip-trigger');
    }
  }

  private attachListeners() {
    if (this.trigger) {
      const events = ['pointerenter', 'pointerleave', 'focusin', 'focusout', 'long-press'];
      events.forEach(event => {
        this.trigger.addEventListener(event, this.boundTriggerHandler);
      });
    }
  }

  private removeListeners() {
    if (this.trigger) {
      const events = ['pointerenter', 'pointerleave', 'focusin', 'focusout', 'long-press'];
      events.forEach(event => {
        this.trigger.removeEventListener(event, this.boundTriggerHandler);
      });
    }
  }

  private attachTooltipListeners() {
    if (this.tooltip) {
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
    switch (event.type) {
      case 'pointerenter':
      case 'focusin':
      case 'long-press':
        this.handleEnter();
        break;
      case 'pointerleave':
      case 'focusout':
        this.handleLeave(event as PointerEvent);
        break;
    }
  }

  private handleTooltipEvent(event: PointerEvent) {
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
    const newTarget = event.relatedTarget as HTMLElement | null;

    if (
      (this.tooltip && newTarget && this.tooltip.contains(newTarget)) ||
      (newTarget === this.trigger)
    ) {
      return;
    }

    this.interestLostHandler();
  }

  private interestHandler() {
    if (this.delay > 0) {
      this.delayTimeout = window.setTimeout(() => {
        this.tooltip?.show(this.trigger);
        this.delayTimeout = null;
      }, this.delay);
    } else {
      this.tooltip?.show(this.trigger);
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
        <slot></slot>
      </Host>
    );
  }
}
