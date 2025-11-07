import { Component, Element, Prop, h, Host, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { getRoot, checkRequiredAndType } from '@/utils';

@Component({
  tag: 'post-menu-trigger',
  styleUrl: 'post-menu-trigger.scss',
  shadow: false,
})
export class PostMenuTrigger {
  /**
   * ID of the menu element that this trigger is linked to. Used to open and close the specified menu.
   */
  @Prop({ reflect: true }) for!: string;

  @Element() host: HTMLPostMenuTriggerElement;

  /**
   * Manages the accessibility attribute `aria-expanded` to indicate whether the associated menu is expanded or collapsed.
   */
  @State() ariaExpanded: boolean = false;

  /**
   * Reference to the slotted button within the trigger, if present.
   * Used to manage click and key events for menu control.
   */
  private slottedButton: HTMLButtonElement | null = null;
  private root: Document | ShadowRoot | null;

  /**
   * Watch for changes to the `for` property to validate its type and ensure it is a string.
   * @param forValue - The new value of the `for` property.
   */
  @Watch('for')
  validateControlFor() {
    checkRequiredAndType(this, 'for', 'string');
  }

  private get menu(): HTMLPostMenuElement | null {
    const ref = this.root.getElementById(this.for);
    return ref && ref.localName === 'post-menu' ? (ref as HTMLPostMenuElement) : null;
  }

  private handleToggle() {
    if (this.menu) {
      this.menu.toggle(this.host);
    } else {
      console.warn(`No post-menu found with ID: ${this.for}`);
    }
  }

  private readonly handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.handleToggle();
    }
  };

  connectedCallback() {
    this.root = getRoot(this.host);
  }

  componentDidLoad() {
    this.validateControlFor();

    this.slottedButton = this.host.querySelector('button');

    // Check if the slottedButton is within a web component
    if (!this.slottedButton) {
      const webComponent = this.host.querySelector('.menu-trigger-webc');
      if (webComponent?.shadowRoot) {
        const slottedButton = webComponent.shadowRoot.querySelector('button');
        if (slottedButton) {
          this.slottedButton = slottedButton;
        }
      }
    }

    if (this.slottedButton) {
      this.slottedButton.setAttribute('aria-haspopup', 'menu');

      // Listen to the `toggleMenu` event emitted by the `post-menu` component
      if (this.menu && this.slottedButton) {
        this.menu.addEventListener('toggleMenu', (event: CustomEvent<boolean>) => {
          this.ariaExpanded = event.detail;
          console.log('aria-expanded:', this.ariaExpanded);
          this.slottedButton.setAttribute('aria-expanded', this.ariaExpanded.toString());
        });
      }

      this.slottedButton.addEventListener('click', () => {
        this.handleToggle();
      });
      this.slottedButton.addEventListener('keydown', this.handleKeyDown);
    } else {
      console.warn('No button found within post-menu-trigger');
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
