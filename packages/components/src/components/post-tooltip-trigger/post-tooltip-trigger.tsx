import { Component, Element, Prop, h, Host, Watch } from '@stencil/core';
import { checkType } from '@/utils';
import { version } from '@root/package.json';
import { getFocusableChildren } from '@/utils/get-focusable-children';

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
   * Reference to the element inside the host that will act as the trigger.
   */
  private trigger: HTMLElement | null = null;

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
    // Get all focusable children within the host element.
    const focusableChildren = getFocusableChildren(this.host);
    // Use the first focusable child, or fallback to the host if none are found.
    this.trigger = focusableChildren.length > 0 ? focusableChildren[0] : this.host;
    console.log('Trigger element:', this.trigger);

    // If the trigger isn't naturally focusable (or is the host fallback), add a tabindex.
    if (!this.trigger.hasAttribute('tabindex')) {
      this.trigger.setAttribute('tabindex', '0');
    }

    // Append the tooltip ID to aria-describedby without overwriting existing values.
    const describedBy = this.trigger.getAttribute('aria-describedby') || '';
    if (!describedBy.includes(this.for)) {
      this.trigger.setAttribute('aria-describedby', `${describedBy} ${this.for}`.trim());
    }
  }

  private attachListeners() {
    if (this.trigger) {
      this.trigger.addEventListener('pointerover', this.interestHandler.bind(this));
      this.trigger.addEventListener('pointerout', this.interestLostHandler.bind(this));
      this.trigger.addEventListener('focusin', this.interestHandler.bind(this));
      this.trigger.addEventListener('focusout', this.interestLostHandler.bind(this));
      this.trigger.addEventListener('long-press', this.interestHandler.bind(this));
    }
  }

  private interestHandler() {
    this.tooltip?.show(this.trigger);
  }

  private interestLostHandler() {
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
