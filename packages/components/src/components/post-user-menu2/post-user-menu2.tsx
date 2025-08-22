import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';
import { nanoid } from 'nanoid';
import { version } from '@root/package.json';
import { checkRequiredAndType } from '@/utils';

export interface User {
  name: string;
  surname?: string;
  email?: string;
}

@Component({
  tag: 'post-user-menu2',
  styleUrl: 'post-user-menu2.scss',
  shadow: true,
})
export class PostUserMenu {
  private readonly menuId = `p${nanoid(11)}`;

  @Element() host: HTMLPostUserMenu2Element;

  /**
   * A title for the user menu
   */
  @Prop() caption!: string;

  @Watch('caption')
  validateCaption() {
    checkRequiredAndType(this, 'caption', 'string');
  }

  /**
   * A descriptive text for the user avatar
   */
  @Prop() description!: string;

  @Watch('description')
  validateDescription() {
    checkRequiredAndType(this, 'description', 'string');
  }

  /**
   * An Object containing the personal data of the user currently logged-in.
   */
  @Prop() user: User = { name: ' John', surname: 'Do', email: 'jdo@mail.com' };

  @Watch('user')
  validateUser() {
    checkRequiredAndType(this, 'user', 'object');
  }

  componentWillLoad() {
    this.validateCaption();
    this.validateDescription();
    this.validateUser();
  }

  private renderAvatar() {
    return (
      <post-avatar2
        firstname={this.user.name}
        lastname={this.user.surname}
        email={this.user.email}
      ></post-avatar2>
    );
  }

  render() {
    return (
      <Host data-version={version}>
        <post-menu-trigger for={this.menuId}>
          <button type="button">
            {this.renderAvatar()}
            <span class="visually-hidden">{this.description}</span>
            <span class="visually-hidden">{this.caption}</span>
          </button>
        </post-menu-trigger>
        <post-menu role="menu" id={this.menuId} aria-label={this.caption}>
          <p class="user-profile">
            {this.renderAvatar()}
            <span class="user-name">
              {this.user.name} {this.user.surname}
            </span>
          </p>
          <slot></slot>
        </post-menu>
      </Host>
    );
  }
}
