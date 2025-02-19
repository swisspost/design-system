import { Component, Element, Prop, h, Host, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkType } from '@/utils';

@Component({
  tag: 'post-megadropdown-trigger',
  styleUrl: 'post-megadropdown-trigger.scss',
  shadow: false,
})
export class PostMegadropdownTrigger {
  /**
   * ID of the mega dropdown element that this trigger is linked to. Used to open and close the specified mega dropdown.
   */
  @Prop() for!: string;

  @Element() host: HTMLPostMegadropdownTriggerElement;

  /**
   * Manages the accessibility attribute `aria-expanded` to indicate whether the associated mega dropdown is expanded or collapsed.
   */
  @State() ariaExpanded: boolean = false;

  /**
   * Reference to the slotted button within the trigger, if present.
   * Used to manage click and key events for mega dropdown control.
   */
  private slottedButton: HTMLButtonElement | null = null;

  /**
   * Tracks whether this trigger's dropdown was expanded before a state change.
   * Used to determine if this trigger should handle focus when its dropdown closes.
   */
  private wasExpanded: boolean = false;

  /**
   * Watch for changes to the `for` property to validate its type and ensure it is a string.
   * @param forValue - The new value of the `for` property.
   */
  @Watch('for')
  validateControlFor(forValue = this.for) {
    checkType(forValue, 'string', 'The "for" property is required and should be a string.');
  }

  private get megadropdown(): HTMLPostMegadropdownElement | null {
    const ref = document.getElementById(this.for);
    return ref && ref.localName === 'post-megadropdown'
      ? (ref as HTMLPostMegadropdownElement)
      : null;
  }

  private handleToggle() {
    if (this.megadropdown) {
      this.megadropdown.toggle();
    } else {
      console.warn(`No post-megadropdown found with ID: ${this.for}`);
    }
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleToggle();
      if (this.megadropdown && !this.ariaExpanded) {
        setTimeout(() => this.megadropdown.focusFirst(), 100);
      }
    }
  };

  componentDidLoad() {
    this.validateControlFor();

    // Check if the mega dropdown attached to the trigger is expanded or not
    document.addEventListener('postToggleMegadropdown', (event: CustomEvent) => {
      if ((event.target as HTMLPostMegadropdownElement).id === this.for) {
        this.ariaExpanded = event.detail;

        if (this.wasExpanded && !this.ariaExpanded) {
          setTimeout(() => this.slottedButton?.focus(), 100);
        }
        this.wasExpanded = this.ariaExpanded;

        if (this.slottedButton) {
          this.slottedButton.setAttribute('aria-expanded', this.ariaExpanded.toString());
        }
      }
    });

    this.slottedButton = this.host.querySelector('button');
    if (this.slottedButton) {
      this.slottedButton.setAttribute('aria-haspopup', 'menu');
      this.slottedButton.addEventListener('click', () => {
        this.handleToggle();
      });
      this.slottedButton.addEventListener('keydown', this.handleKeyDown);
    } else {
      console.warn('No button found within post-megadropdown-trigger');
    }
  }

  render() {
    return (
      <Host data-version={version} tab-index="-1">
        <button>
          <slot></slot>
        </button>
      </Host>
    );
  }
}
