import { Component, Element, Prop, h, Host, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkType } from '@/utils';

@Component({
  tag: 'post-menu-trigger',
  styleUrl: 'post-menu-trigger.scss',
  shadow: false,
})

export class PostMenuTrigger {
  /**
   * Link the trigger to a menu with this ID.
   */
  @Prop() for!: string;

  @Element() host: HTMLPostMenuTriggerElement;

  /**
   * Indicates the expanded state of the menu for accessibility purposes.
   */
  @State() ariaExpanded: boolean = false;

  private slottedButton: HTMLButtonElement | null = null;

  /**
   * Watch for changes to the `for` property.
   */
  @Watch('for')
  validateControlFor(forValue = this.for) {
    if (this.for) {
      checkType(forValue, 'string', 'The "for" property is required and should be a string.');
    }
  }
    
  private get menu(): HTMLPostMenuElement | null {
    const ref = document.getElementById(this.for);
    return ref && ref.localName === 'post-menu' ? (ref as HTMLPostMenuElement) : null;
  }

  private handleToggle() {
    const menu = this.menu;
    if (menu && this.slottedButton) {
      this.ariaExpanded = !this.ariaExpanded;
      this.slottedButton.setAttribute('aria-expanded', this.ariaExpanded.toString());
      
      // Toggle the menu visibility
      menu.toggle(this.host);
    } else {
      console.warn(`No post-menu found with ID: ${this.for}`);
    }
  }

  componentDidLoad() {
    this.slottedButton = this.host.querySelector('button');
    if (this.slottedButton) {
      this.slottedButton.setAttribute('aria-haspopup', 'menu');
      this.slottedButton.addEventListener('focusin', this.handleFocusIn.bind(this));
      this.slottedButton.addEventListener('focusout', this.handleFocusOut.bind(this));
      this.slottedButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Button clicked');
        this.handleToggle();
      });
    } else {
      console.warn('No button found within post-menu-trigger');
    }
  }
  
  private handleFocusIn() {
    this.slottedButton?.classList.add('no-pointer-events');
  }
  
  private handleFocusOut() {
    this.slottedButton?.classList.remove('no-pointer-events');
  }

  render() {
    return (
      <Host data-version={version} tab-index="-1">
        <slot></slot>
      </Host>
    );
  }
}
