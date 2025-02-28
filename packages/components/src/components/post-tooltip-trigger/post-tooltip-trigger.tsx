import { Component, Element, Prop, h, Host, Watch } from '@stencil/core';
import isFocusable from 'ally.js/is/focusable';
import { checkType } from '@/utils';
import { version } from '@root/package.json';

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

  private trigger: HTMLElement;

  @Watch('for')
  validateControlFor() {
    checkType(this, 'for', 'string', 'The "for" property is required and should be a string.');
  }

  private get tooltip(): HTMLPostTooltipElement | null {
    const ref = document.getElementById(this.for);
    return ref && ref.localName === 'post-tooltip' ? (ref as HTMLPostTooltipElement) : null;
  }

  componentDidLoad() {
    this.host.setAttribute('data-version', version);
    this.setupTrigger();
    this.attachListeners();
  }

  private setupTrigger() {
    // Directly select the first button element inside the host.
    this.trigger = this.host.querySelector('button') || this.host;

    // If the trigger element is not natively focusable, add a tabindex.
    if (!isFocusable(this.trigger)) {
      this.trigger.setAttribute('tabindex', '0');
    } else {
      this.trigger.removeAttribute('tabindex');
    }

    // Append the tooltip id to aria-describedby without overwriting existing values.
    const describedBy = this.trigger.getAttribute('aria-describedby') || '';
    if (!describedBy.includes(this.for)) {
      this.trigger.setAttribute('aria-describedby', `${describedBy} ${this.for}`.trim());
    }
  }

  private attachListeners() {
    // Use the host as the event delegation point.
    this.host.addEventListener('pointerover', this.interestHandler.bind(this));
    this.host.addEventListener('pointerout', this.interestLostHandler.bind(this));
    this.host.addEventListener('focusin', this.interestHandler.bind(this));
    this.host.addEventListener('focusout', this.interestLostHandler.bind(this));
    this.host.addEventListener('long-press', this.interestHandler.bind(this));
  }

  private interestHandler() {
    this.tooltip?.show(this.trigger);
  }

  private interestLostHandler() {
    this.tooltip?.hide();
  }

  render() {
    return (
      <Host data-version={version} tab-index="-1">
        <slot></slot>
      </Host>
    );
  }
}
