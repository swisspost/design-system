import { Component, Element, Prop, Watch } from '@stencil/core';
import isFocusable from 'ally.js/is/focusable';
import { checkType } from '@/utils';
import { version } from '@root/package.json';

@Component({
  tag: 'post-tooltip-trigger',
  styleUrl: 'post-tooltip-trigger.scss',
})

export class PostTooltipTrigger {
  @Element() host: HTMLPostTooltipTriggerElement;

  /**
   * ID of the tooltip element that this trigger is linked to. Used to open and close the specified tooltip.
   */
  @Prop() for!: string;

  private trigger: HTMLElement;
  private localInterestHandler: () => void;
  private localInterestLostHandler: () => void;

  /**
   * Watch for changes to the `for` property to validate its type and ensure it is a string.
   * @param forValue - The new value of the `for` property.
   */
  @Watch('for')
  validateControlFor() {
    checkType(this, 'for', 'string', 'The "for" property is required and should be a string.');
  }

  private get tooltip(): HTMLPostTooltipElement | null {
    const ref = document.getElementById(this.for);    
    return ref && ref.localName === 'post-tooltip' ? (ref as HTMLPostTooltipElement) : null;
  }

  constructor() {
    this.localInterestHandler = this.interestHandler.bind(this);
    this.localInterestLostHandler = this.interestLostHandler.bind(this);
  }

  componentDidLoad() {
    this.host.setAttribute('data-version', version);
    this.setupTrigger();
    this.attachListeners();
  }

  private setupTrigger() {
    const slot = this.host.querySelector('slot');
    this.updateTrigger(slot);
    slot?.addEventListener('slotchange', () => this.updateTrigger(slot));
  }

  private updateTrigger(slot: HTMLSlotElement | null) {
    const assignedElements = slot?.assignedElements() || [];
    this.trigger = (assignedElements[0] as HTMLElement) || this.host;
  
    // If not focusable, explicitly set tabindex="0"
    if (!isFocusable(this.trigger)) {
      this.trigger.setAttribute('tabindex', '0');
    } else {
      this.trigger.removeAttribute('tabindex');
    }
  
    // Append the tooltip id to aria-describedby without overwriting existing values
    const describedBy = this.trigger.getAttribute('aria-describedby') || '';
    if (!describedBy.includes(this.for)) {
      const newDescribedBy = describedBy ? `${describedBy} ${this.for}` : this.for;
      this.trigger.setAttribute('aria-describedby', newDescribedBy.trim());
    }
  }
   
  private attachListeners() {
    this.host.addEventListener('pointerover', this.localInterestHandler);
    this.host.addEventListener('pointerout', this.localInterestLostHandler);
    this.host.addEventListener('focusin', this.localInterestHandler);
    this.host.addEventListener('focusout', this.localInterestLostHandler);
    this.host.addEventListener('long-press', this.localInterestHandler);
  }

  private interestHandler() {
    this.tooltip?.show(this.trigger);
  }

  private interestLostHandler() {
    this.tooltip?.hide();
  }
}
