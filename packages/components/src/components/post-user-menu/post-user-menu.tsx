import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';
import { nanoid } from 'nanoid';
import { version } from '@root/package.json';
import { checkEmptyOrType } from '@/utils';

export interface User {
  name: string;
  surname?: string;
  email?: string;
}

@Component({
  tag: 'post-user-menu',
  styleUrl: 'post-user-menu.scss',
  shadow: true,
})
export class PostUserMenu {
  private readonly menuId = `p${nanoid(11)}`;

  @Element() host: HTMLPostUserMenuElement;

  /**
   * An Object containing the personal data of the user currently logged-in.
   */
  @Prop() user?: User;

  @Watch('user')
  validateUser() {
    checkEmptyOrType(this, 'user', 'object');
  }

  private renderAvatar() {
    return (
      <post-avatar
        firstname={this.user.name}
        lastname={this.user.surname}
        email={this.user.email}
      ></post-avatar>
    );
  }

  render() {
    return (
      <Host data-version={version}>
        {this.user ? [
          <post-menu-trigger for={this.menuId}>
            <button>{this.renderAvatar()}</button>
          </post-menu-trigger>,
          <post-menu id={this.menuId}>
            <p class="user-profile">
              {this.renderAvatar()}
              <span class="user-name">{this.user.name} {this.user.surname}</span>
            </p>
            <slot></slot>
          </post-menu>,
        ] : (
          <slot name="login" />
        )}
      </Host>
    );
  }
}
