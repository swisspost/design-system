import { Component, h, Host, Prop, Watch, Element, State } from '@stencil/core';
import { version } from '@root/package.json';
import isFocusable from 'ally.js/is/focusable';
import { checkRequiredAndType } from '@/utils';

@Component({
  tag: 'post-popover-trigger',
  styleUrl: 'post-popover-trigger.scss',
  shadow: true,
})
export class PostPopoverTrigger {
  @Element() host: HTMLPostPopoverTriggerElement;

  /**
   * ID of the popover element that this trigger is linked to. Used to open and close the popover.
   */
  @Prop({ reflect: true }) for!: string;

  /**
   * Manages the accessibility attribute `aria-expanded` to indicate whether the associated popover is expanded or collapsed.
   */
  @State() ariaExpanded: boolean = false;

  /**
   * Watch for changes to the `for` property to validate its type and ensure it is a string.
   * @param forValue - The new value of the `for` property.
   */
  @Watch('for')
  validateFor() {
    checkRequiredAndType(this, 'for', 'string');
  }

  /**
   * Reference to the element inside the host that will act as the trigger.
   */
  private trigger: HTMLElement;

  private readonly boundHandleToggle: (event: Event) => void;
  private readonly boundHandleKeyDown: (event: Event) => void;
  private readonly boundHandlePopoverPostToggle: (
    event: CustomEvent<{ isOpen: boolean; first: boolean }>,
  ) => void;

  //this gets the associated popover element to the trigger based on 'for'
  private get popover(): HTMLPostPopoverElement | null {
    const ref = document.getElementById(this.for);
    return ref?.localName === 'post-popover' ? (ref as HTMLPostPopoverElement) : null;
  }

  // when the content of the trigger changes
  private handleSlotChange() {
    this.setupTrigger();
  }

  // setup the trigger to get the correct aria attributes
  private setupTrigger() {
    this.trigger = this.host.querySelector('*');

    if (this.trigger) {
      this.trigger.setAttribute('aria-expanded', this.ariaExpanded.toString());

      // check if its not focusable and add aria role and tabindex
      if (!isFocusable(this.trigger)) {
        this.trigger.setAttribute('tabindex', '0');
        this.trigger.setAttribute('role', 'button');
      }

      // set aria attributes
      this.trigger.setAttribute('aria-haspopup', 'true');
      this.trigger.setAttribute('aria-controls', this.for);

      // add event listeners
      this.trigger.addEventListener('click', this.boundHandleToggle);
      this.trigger.addEventListener('keydown', this.boundHandleKeyDown);
      if (this.popover) {
        this.popover.addEventListener('postToggle', this.boundHandlePopoverPostToggle);
      }
    } else {
      console.warn(
        'No content found in the post-popover-trigger slot. Please insert a focusable element or content that can receive focus.',
      );
    }
  }

  private handleToggle() {
    const popoverEl = this.popover;
    if (popoverEl) {
      popoverEl.toggle(this.trigger);
      if (this.ariaExpanded === false) {
        this.trigger.focus();
      }
    } else {
      console.warn(`No post-popover found with ID: ${this.for}`);
    }
  }

  private readonly handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleToggle();
    }
  };

  private readonly handlePopoverPostToggle = (
    event: CustomEvent<{ isOpen: boolean; first: boolean }>,
  ) => {
    this.ariaExpanded = event.detail.isOpen;
    this.trigger.setAttribute('aria-expanded', this.ariaExpanded.toString());
  };

  constructor() {
    this.boundHandleToggle = this.handleToggle.bind(this);
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandlePopoverPostToggle = this.handlePopoverPostToggle.bind(this);
  }

  componentDidLoad() {
    this.validateFor();
    this.setupTrigger();
  }

  disconnectedCallback() {
    // remove event listeners
    this.trigger.removeEventListener('click', this.boundHandleToggle);
    this.trigger.removeEventListener('keydown', this.boundHandleKeyDown);
    this.popover.removeEventListener('postToggle', this.boundHandlePopoverPostToggle);
  }

  render() {
    return (
      <Host data-version={version}>
        <slot onSlotchange={() => this.handleSlotChange()}></slot>
      </Host>
    );
  }
}
