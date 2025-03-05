import { Component, Element, Prop, h, Host, Watch } from '@stencil/core';
import { checkType } from '@/utils';
import { version } from '@root/package.json';
import isFocusable from 'ally.js/is/focusable';

@Component({
  tag: 'post-tooltip-trigger',
  styleUrl: 'post-tooltip-trigger.scss',
  shadow: false,
})
export class PostTooltipTrigger {
  @Element() host: HTMLPostTooltipTriggerElement;

  /**
   * ID of the tooltip element that this trigger is linked to.
   */
  @Prop() for!: string;

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

    // Attach listeners on the tooltip to handle pointer enter/leave events
    if (this.tooltip) {
      this.tooltip.addEventListener('pointerenter', this.handleTooltipEnter.bind(this));
      this.tooltip.addEventListener('pointerleave', this.handleTooltipLeave.bind(this));
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
      this.trigger.addEventListener('pointerenter', this.handleTriggerEnter.bind(this));
      this.trigger.addEventListener('pointerleave', this.handleTriggerLeave.bind(this));
      this.trigger.addEventListener('focusin', this.handleTriggerEnter.bind(this));
      this.trigger.addEventListener('focusout', this.handleTriggerLeave.bind(this));
      this.trigger.addEventListener('long-press', this.handleTriggerEnter.bind(this));
    }
  }

  private handleTriggerEnter() {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
      this.delayTimeout = null;
    }
    this.interestHandler();
  }

  private handleTriggerLeave(event: PointerEvent) {
    // Check where the pointer is headed
    const newTarget = event.relatedTarget as HTMLElement | null;
    if (this.tooltip && newTarget && this.tooltip.contains(newTarget)) {
      // Pointer is moving to the tooltip; keep it open.
      return;
    }
    this.interestLostHandler();
  }

  private handleTooltipEnter() {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
      this.delayTimeout = null;
    }
    this.interestHandler();
  }

  private handleTooltipLeave(event: PointerEvent) {
    const newTarget = event.relatedTarget as HTMLElement | null;
    if (this.trigger && newTarget && this.trigger.contains(newTarget)) {
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
