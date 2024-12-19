import { Component, Element, Prop, h, Host, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkType, getRoot } from '@/utils';

@Component({
  tag: 'post-menu-trigger',
  styleUrl: 'post-menu-trigger.scss',
  shadow: false,
})
export class PostMenuTrigger {
  /**
   * ID of the menu element that this trigger is linked to. Used to open and close the specified menu.
   */
  @Prop() for!: string;

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
  private root?: Document | ShadowRoot;

  /**
   * Watch for changes to the `for` property to validate its type and ensure it is a string.
   * @param forValue - The new value of the `for` property.
   */
  @Watch('for')
  validateControlFor(forValue = this.for) {
    checkType(forValue, 'string', 'The "for" property is required and should be a string.');
  }

  private get menu(): HTMLPostMenuElement | null {
    const ref = this.root.getElementById(this.for);
    return ref && ref.localName === 'post-menu' ? (ref as HTMLPostMenuElement) : null;
  }

  private handleToggle() {
    const menu = this.menu;
    if (menu && this.slottedButton) {
      this.ariaExpanded = !this.ariaExpanded;
      this.slottedButton.setAttribute('aria-expanded', this.ariaExpanded.toString());
      menu.toggle(this.host);
    } else {
      console.warn(`No post-menu found with ID: ${this.for}`);
    }
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.handleToggle();
    }
  };

  componentDidLoad() {
    this.root = getRoot(this.host);
    this.validateControlFor();

    this.slottedButton = this.host.querySelector('button');

    // Check if the slottedButton is within a web component
    if (!this.slottedButton) {
      const webComponent = this.host.querySelector('.menu-trigger-webc');
      if (webComponent.shadowRoot) {
        const slottedButton = webComponent.shadowRoot.querySelector('button');
        if (slottedButton) {
          this.slottedButton = slottedButton;
        }
      }
    }

    if (this.slottedButton) {
      this.slottedButton.setAttribute('aria-haspopup', 'menu');
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
