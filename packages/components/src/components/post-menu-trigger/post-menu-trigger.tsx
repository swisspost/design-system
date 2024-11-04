import { Component, Element, Prop, h, Host, State, Listen } from '@stencil/core';

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
    } else {
      console.warn(`No post-menu found with ID: ${this.for}`);
    }
  }

  /**
   * Listen for the custom `toggleMenu` event from `post-menu`.
   */
  @Listen('toggleMenu', { target: 'body' })
  handleToggleMenu(event: CustomEvent<boolean>) {
    this.ariaExpanded = event.detail ? 'true' : 'false';
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
