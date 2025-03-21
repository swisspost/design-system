import { Component, Element, Prop, h, Host, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { IS_BROWSER, checkType } from '@/utils';

@Component({
  tag: 'post-megadropdown-trigger',
  styleUrl: 'post-megadropdown-trigger.scss',
  shadow: true,
})
export class PostMegadropdownTrigger {
  /**
   * Reference to the slotted button within the trigger, if present.
   * Used to manage click and key events for mega dropdown control.
   */
  private button: HTMLButtonElement | null = null;

  /**
   * Tracks whether this trigger's dropdown was expanded before a state change.
   * Used to determine if this trigger should handle focus when its dropdown closes.
   */
  private wasExpanded: boolean = false;

  private readonly slotObserver: MutationObserver;

  private get megadropdown(): HTMLPostMegadropdownElement | null {
    const ref = IS_BROWSER ? document.getElementById(this.for) : null;

    return ref && ref.localName === 'post-megadropdown'
      ? (ref as unknown as HTMLPostMegadropdownElement)
      : null;
  }

  @Element() host: HTMLPostMegadropdownTriggerElement;

  /**
   * ID of the mega dropdown element that this trigger is linked to. Used to open and close the specified mega dropdown.
   */
  @Prop() for!: string;

  /**
   * Manages the accessibility attribute `aria-expanded` to indicate whether the associated mega dropdown is expanded or collapsed.
   */
  @State() ariaExpanded: boolean = false;

  /**
   * Slotted html which need to be mirrored in the .active element to avoid layout shifts.
   */
  @State() slottedHTML: string;

  /**
   * Watch for changes to the `for` property to validate its type and ensure it is a string.
   * @param forValue - The new value of the `for` property.
   */
  @Watch('for')
  validateFor() {
    checkType(this, 'for', 'string');
  }

  constructor() {
    this.setSlottedHTML = this.setSlottedHTML.bind(this);
    this.toggle = this.toggle.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.handleToggleEvent = this.handleToggleEvent.bind(this);

    this.slotObserver = new MutationObserver(this.setSlottedHTML);
  }

  private setSlottedHTML() {
    this.slottedHTML = this.host.innerHTML;
  }

  private toggle() {
    if (this.megadropdown) {
      this.megadropdown.toggle();
    } else {
      console.warn(`No post-megadropdown found with ID: ${this.for}`);
    }
  }

  private keyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggle();

      if (this.megadropdown && !this.ariaExpanded) {
        setTimeout(() => this.megadropdown.focusFirst());
      }
    }
  }

  private handleToggleEvent(event: CustomEvent) {
    if ((event.target as HTMLElement).id === this.for) {
      this.ariaExpanded = event.detail.isVisible;

      // Focus on the trigger parent of the dropdown after it's closed if close button had been clicked
      if (this.wasExpanded && !this.ariaExpanded && event.detail.focusParent) {
        setTimeout(() => {
          this.button?.focus();
        }, 100);
      }
      this.wasExpanded = this.ariaExpanded;
    }
  }

  connectedCallback() {
    this.setSlottedHTML();

    // Check if the mega dropdown attached to the trigger is expanded or not
    document.addEventListener('postToggleMegadropdown', this.handleToggleEvent);
  }

  componentDidLoad() {
    this.validateFor();

    this.slotObserver.observe(this.host, { characterData: true, childList: true, subtree: true });
    this.button.addEventListener('click', this.toggle);
    this.button.addEventListener('keydown', this.keyDown);
  }

  disconnectedCallback() {
    document.removeEventListener('postToggleMegadropdown', this.handleToggleEvent);
    this.slotObserver.disconnect();
    this.button.removeEventListener('click', this.toggle);
    this.button.removeEventListener('keydown', this.keyDown);
  }

  render() {
    return (
      <Host data-version={version} tab-index="-1">
        <button
          ref={(el: HTMLButtonElement) => (this.button = el)}
          aria-haspopup="menu"
          aria-expanded={this.ariaExpanded.toString()}
        >
          <span>
            <span class="active" aria-hidden="true" innerHTML={this.slottedHTML}></span>
            <span class="inactive">
              <slot></slot>
            </span>
          </span>
        </button>
      </Host>
    );
  }
}
