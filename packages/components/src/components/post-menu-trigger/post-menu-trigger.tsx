import { Component, Element, Prop, h, Host, State } from '@stencil/core';

@Component({
  tag: 'post-menu-trigger',
  styleUrl: 'post-menu-trigger.scss',
  shadow: true,
})
export class PostMenuTrigger {
  @Element() host: HTMLPostMenuTriggerElement;

  /**
   * Links the toggle to a `post-menu` with this ID.
   */
  @Prop() for: string;

  @State() ariaExpanded: string = 'false';

  private async toggleMenu() {
    const menu = document.getElementById(this.for) as HTMLPostMenuElement;
    if (menu) {
      await menu.toggle(this.host);
      // Update the aria-expanded state based on the menu's new state
      this.ariaExpanded = this.ariaExpanded === 'true' ? 'false' : 'true';
    } else {
      console.warn(`No post-menu found with ID: ${this.for}`);
    }
  }

  render() {
    return (
      <Host
        aria-haspopup="true"
        aria-expanded={this.ariaExpanded}
        onClick={() => this.toggleMenu()}
      >
        <slot></slot>
      </Host>
    );
  }
}
