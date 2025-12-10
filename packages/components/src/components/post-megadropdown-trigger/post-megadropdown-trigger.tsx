import { Component, Element, Prop, h, Host, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType, EventFrom } from '@/utils';

@Component({
  tag: 'post-megadropdown-trigger',
  shadow: true,
})
export class PostMegadropdownTrigger {
  @Element() host: HTMLPostMegadropdownTriggerElement;

  /**
   * Manages the accessibility attribute `aria-expanded` to indicate whether the associated mega dropdown is expanded or collapsed.
   */
  private ariaExpanded: boolean = false;

  /**
   * Observes changes in the content of the megadropdown trigger
   */
  private mutationObserver = new MutationObserver(this.cloneSlottedButton.bind(this));

  /**
   * Reference to the slotted button within the trigger, if present.
   * Used to manage click and key events for mega dropdown control.
   */
  private slottedButton: HTMLButtonElement | null = null;

  /**
   * ID of the mega dropdown element that this trigger is linked to. Used to open and close the specified mega dropdown.
   */
  @Prop({ reflect: true }) for!: string;

  /**
   * Watch for changes to the `for` property to validate its type and ensure it is a string.
   */
  @Watch('for')
  validateFor() {
    checkRequiredAndType(this, 'for', 'string');
  }

  constructor() {
    this.handleToggleMegadropdown = this.handleToggleMegadropdown.bind(this);
  }

  connectedCallback() {
    this.mutationObserver.observe(this.host, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  componentWillLoad() {
    this.cloneSlottedButton();
  }

  componentDidLoad() {
    this.validateFor();

    // Check if the mega dropdown attached to the trigger is expanded or not
    document.addEventListener('postToggleMegadropdown', this.handleToggleMegadropdown);
  }

  disconnectedCallback() {
    document.removeEventListener('postToggleMegadropdown', this.handleToggleMegadropdown);
    this.mutationObserver.disconnect();
  }

  private cloneSlottedButton() {
    if (this.host.querySelectorAll('button[inert]').length > 0) return;

    if (this.host.children.length !== 1 || this.host.children[0].localName !== 'button') {
      console.warn('The post-megadropdown-trigger content must be a single button.');
    }

    this.slottedButton = this.host.children[0] as HTMLButtonElement;
    this.setInitialAttributes();

    const clone = this.slottedButton.cloneNode(true) as HTMLButtonElement;
    clone.setAttribute('inert', '');

    this.host.append(clone);
  }

  private setInitialAttributes() {
    this.slottedButton.setAttribute('type', 'button');
    this.slottedButton.setAttribute('aria-haspopup', 'menu');
    this.slottedButton.setAttribute('aria-expanded', 'false');
    this.slottedButton.addEventListener('click', () => {
      this.handleToggle();
    });
    this.slottedButton.addEventListener('keydown', this.handleKeyDown);
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
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleToggle();
      if (this.megadropdown && !this.ariaExpanded) {
        setTimeout(() => this.megadropdown.focusFirst(), 100);
      }
    }
  };

  @EventFrom('post-megadropdown', { ignoreNestedComponents: false })
  private handleToggleMegadropdown(
    event: CustomEvent<{ isVisible: boolean; focusParent: boolean }>,
  ) {
    if ((event.target as HTMLPostMegadropdownElement).id === this.for) {
      const wasExpanded = this.ariaExpanded;
      this.ariaExpanded = event.detail.isVisible;

      // Focus on the trigger parent of the dropdown after it's closed if the close button had been clicked
      if (wasExpanded && !this.ariaExpanded && event.detail.focusParent) {
        setTimeout(() => {
          this.slottedButton?.focus();
        }, 100);
      }

      if (this.slottedButton) {
        this.slottedButton.setAttribute('aria-expanded', this.ariaExpanded.toString());
      }
    }
  }

  render() {
    return (
      <Host data-version={version} tab-index="-1">
        <slot></slot>
      </Host>
    );
  }
}
