import { Component, h, Host, Prop, Watch, Element, State } from '@stencil/core';
import { version } from '@root/package.json';
import isFocusable from 'ally.js/is/focusable';
import { checkEmptyOrType } from '@/utils';

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
  @Prop({ reflect: true }) for?: string;

  /**
   * Manages the accessibility attribute `aria-expanded` to indicate whether the associated popover is expanded or collapsed.
   */
  @State() ariaExpanded: boolean = false;

  /**
   * Holds the state of the popover toggle
   */
  @State() private popoverOpen: boolean = false;

  @Watch('popoverOpen')
  syncAriaExpanded(newValue: boolean) {
    this.ariaExpanded = newValue;
    if (this.trigger) {
      this.trigger.setAttribute('aria-expanded', String(newValue));
    }
  }

  /**
   * Watch for changes to the `for` property to validate its type and ensure it is a string.
   * @param forValue - The new value of the `for` property.
   */
  @Watch('for')
  validateFor() {
    checkEmptyOrType(this, 'for', 'string');
  }

  /**
   * Reference to the element inside the host that will act as the trigger.
   */
  private trigger: HTMLElement;

  private hasAriaControlsElements(
    el: HTMLElement,
  ): el is HTMLElement & { ariaControlsElements: HTMLElement[] } {
    return 'ariaControlsElements' in el;
  }

  private readonly boundHandleToggle: (event: Event) => void;
  private readonly boundHandleKeyDown: (event: Event) => void;
  private readonly boundHandlePostToggle: (event: CustomEvent<{ isOpen: boolean }>) => void;

  // Gets the associated to the trigger popover element
  private get popover(): HTMLPostPopoverElement | null {
    const ref = this.host.querySelector('post-popover') ?? document.getElementById(this.for);

    if (!ref) {
      const target = this.for ? `with ID: ${this.for}` : 'inside the <post-popover-trigger>';
      console.warn(`No post-popover found ${target}.`);
      return null;
    }
    return ref?.localName === 'post-popover' ? (ref as HTMLPostPopoverElement) : null;
  }

  private setupTrigger() {
    const popover = this.popover;
    this.trigger = this.host.querySelector('*');

    if (!this.trigger) {
      console.error(
        'No content found in the post-popover-trigger slot. Please insert a focusable element or content that can receive focus.',
      );
      return;
    }

    // check if its not focusable and add aria role and tabindex
    if (!isFocusable(this.trigger)) {
      this.trigger.setAttribute('tabindex', '0');
      this.trigger.setAttribute('role', 'button');
    }

    if (!popover) return;

    // Set aria attributes
    this.trigger.setAttribute('aria-expanded', this.ariaExpanded.toString());
    this.trigger.setAttribute('aria-haspopup', 'true');

    // Set aria-controls depending on the popover/trigger relationship

    if (this.for) {
      this.trigger.setAttribute('aria-controls', this.for);
    } else {
      if (this.hasAriaControlsElements(this.trigger)) {
        this.trigger.ariaControlsElements = [popover];
      } else {
        popover.id ||= `popover-${crypto.randomUUID()}`;
        this.trigger.setAttribute('aria-controls', popover.id);
      }
    }

    this.trigger.addEventListener('click', this.boundHandleToggle);
    this.trigger.addEventListener('keydown', this.boundHandleKeyDown);
  }

  private handleToggle() {
    this.popover?.toggle(this.trigger);
    this.focusTrigger();
  }

  private focusTrigger() {
    // Restores focus to the trigger
    if (!this.popoverOpen && this.trigger) {
      this.trigger.focus();
    }
  }

  private readonly handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleToggle();
    }
  };

  constructor() {
    this.boundHandleToggle = this.handleToggle.bind(this);
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandlePostToggle = (event: CustomEvent<{ isOpen: boolean }>) => {
      this.popoverOpen = event.detail.isOpen;
      this.focusTrigger();
    };
  }

  componentDidLoad() {
    this.validateFor();
    this.setupTrigger();
    this.popover?.addEventListener('postToggle', this.boundHandlePostToggle);
  }

  disconnectedCallback() {
    this.trigger.removeEventListener('click', this.boundHandleToggle);
    this.trigger.removeEventListener('keydown', this.boundHandleKeyDown);
    this.popover?.removeEventListener('postToggle', this.boundHandlePostToggle);
  }

  render() {
    return (
      <Host data-version={version}>
        <slot onSlotchange={() => this.setupTrigger()}></slot>
      </Host>
    );
  }
}
