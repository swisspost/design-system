import { Component, Element, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'post-menu-toggle',
  styleUrl: 'post-menu-toggle.scss',
  shadow: true,
})
export class PostMenuToggle {
  @Element() host: HTMLPostMenuToggleElement;

  /**
   * Links the toggle to a `post-menu` with this ID.
   */
  @Prop() for: string;

  private toggleMenu() {
    const menu = document.getElementById(this.for) as HTMLPostMenuElement;
    if (menu) {
      menu.toggle(this.host);
    } else {
      console.warn(`No post-menu found with ID: ${this.for}`);
    }
  }

  render() {
    return (
      <Host aria-haspopup="true" onClick={() => this.toggleMenu()}>
        <slot></slot>
      </Host>
    );
  }
}
