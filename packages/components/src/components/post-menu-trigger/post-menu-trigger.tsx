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
    if(ref && ref.localName === 'post-menu') {
      return ref as HTMLPostMenuElement;
    }

    return null;
  }

  private handleToggle() {
  const menu = this.menu;
    if (menu) {
      this.ariaExpanded = !this.ariaExpanded;
      this.ariaExpanded ? menu.show(this.host) : menu.hide();
    } else {
      console.warn(`No post-menu found with ID: ${this.for}`);
    }
  }

  render() {
    return (
      <Host
        data-version={version} 
        aria-expanded={this.ariaExpanded.toString()}
        onClick={() => this.handleToggle()}
      >
        <slot></slot>
      </Host>
    );
  }
}
