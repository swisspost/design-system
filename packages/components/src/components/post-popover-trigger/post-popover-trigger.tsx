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
   * Reference to the element inside the host that will act as the trigger.
   */
  private trigger: HTMLElement;

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

  //this gets the associated popover element to the trigger based on 'for'
  private get popover(): HTMLPostPopoverElement | null {
    const ref = document.getElementById(this.for);
    return ref?.localName === 'post-popover' ? (ref as HTMLPostPopoverElement) : null;
  }

  private handleToggle() {
    if (this.popover) {
      this.popover.toggle(this.host);
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
      this.trigger.setAttribute('ariahaspopup', 'true');

      this.trigger.setAttribute('ariacontrols', this.for);

      // add event listeners for click and keydown
      this.trigger.addEventListener('click', () => {
        this.handleToggle();
      });
      this.trigger.addEventListener('keydown', this.handleKeyDown);

      // Listen to the `toggle` event emitted by the `post-popover` component
      if (this.popover && this.trigger) {
        this.popover.addEventListener(
          'postToggle',
          (event: CustomEvent<{ isOpen: boolean; first: boolean }>) => {
            this.ariaExpanded = event.detail.isOpen;
            this.trigger.setAttribute('aria-expanded', this.ariaExpanded.toString());
          },
        );
      }
    } else {
      console.warn(
        'No content found in the post-popover-trigger slot. Please insert a focusable element or content that can receive focus.',
      );
    }
  }

  componentDidLoad() {
    this.setupTrigger();
    this.validateFor();
  }

  disconnectedCallback() {
    // remove event listeners
    this.trigger.removeEventListener('click', () => {
      this.handleToggle();
    });
    this.trigger.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <Host data-version={version}>
        <slot onSlotchange={() => this.handleSlotChange()}></slot>
      </Host>
    );
  }
}
