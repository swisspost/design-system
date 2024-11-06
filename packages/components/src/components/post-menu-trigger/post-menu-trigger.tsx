import { Component, Element, Prop, h, Host, State } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-menu-trigger',
  styleUrl: 'post-menu-trigger.scss',
  shadow: true,
})

export class PostMenuTrigger {
  /**
   * Link the trigger to a menu with this ID.
   */
  @Prop() for: string;

  @Element() host: HTMLPostMenuTriggerElement;

  @State() ariaExpanded: boolean = false;

  private get menu(): HTMLPostMenuElement | null {
    return document.getElementById(this.for) as HTMLPostMenuElement;
  }

  private handleToggle() {
    if (this.menu) {
      this.ariaExpanded = !this.ariaExpanded;
      this.ariaExpanded ? this.menu.show(this.host) : this.menu.hide();
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
