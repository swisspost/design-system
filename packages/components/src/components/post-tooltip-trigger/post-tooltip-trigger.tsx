import { Component, Element, Prop } from '@stencil/core';
import { isFocusable } from '../../utils/is-focusable';
import { version } from '@root/package.json';
import 'long-press-event';

@Component({
  tag: 'post-tooltip-trigger',
})
export class PostTooltipTrigger {
  /**
   * Link the trigger to a tooltip with this id
   */
  @Prop() for: string;

  @Element() host: HTMLPostTooltipTriggerElement;

  private trigger: HTMLElement;
  private localInterestHandler;
  private localInterestLostHandler;

  constructor() {
    this.localInterestHandler = this.interestHandler.bind(this);
    this.localInterestLostHandler = this.interestLostHandler.bind(this);
  }

  componentDidLoad() {
    this.host.setAttribute('data-version', version);

    if (this.host?.children.length > 0 && this.host.children[0].nodeType === 1) {
      this.trigger = this.host.children[0] as HTMLElement;
    } else {
      this.trigger = this.host;
    }

    // Ensure trigger is focusable
    if (!isFocusable(this.trigger)) {
      this.trigger.setAttribute('tabindex', '0');
    }

    // Add tooltip to aria-describedby
    const describedBy = this.trigger.getAttribute('aria-describedby');
    if (!describedBy?.includes(this.for)) {
      const newDescribedBy = describedBy ? `${describedBy} ${this.for}` : this.for;
      this.trigger.setAttribute('aria-describedby', newDescribedBy);
    }

    this.host.addEventListener('pointerover', this.localInterestHandler);
    this.host.addEventListener('pointerout', this.localInterestLostHandler);
    this.host.addEventListener('focusin', this.localInterestHandler);
    this.host.addEventListener('focusout', this.localInterestLostHandler);
    this.host.addEventListener('long-press', this.localInterestHandler);
  }

  private get tooltip(): HTMLPostTooltipElement | null {
    const ref = document.getElementById(this.for);
    if (ref && ref.tagName === 'POST-TOOLTIP') {
      return ref as HTMLPostTooltipElement;
    }

    return null;
  }

  private interestHandler() {
    this.tooltip?.show(this.trigger);
  }

  private interestLostHandler() {
    this.tooltip?.hide();
  }
}
