import { Component, Host, h, Prop, Watch } from '@stencil/core';
import { checkEmptyOrType } from '@/utils';
import { PictureSize } from '@/components/post-avatar-picture/picture-sizes';

@Component({
  tag: 'post-avatar',
  styleUrl: 'post-avatar.scss',
  shadow: true,
})
export class PostAvatar {
  /**
   * The user's company name
   */
  @Prop() readonly company?: string;

  @Watch('company')
  validateCompany() {
    checkEmptyOrType(
      this.company,
      'string',
      'The "company" property of the post-avatar should be a string.',
    );
  }

  /**
   * The user's email address
   */
  @Prop() readonly email?: string;

  /**
   * The user's firstname
   */
  @Prop() readonly firstname?: string;

  /**
   * The user's lastname
   */
  @Prop() readonly lastname?: string;

  /**
   * The size of the avatar
   */
  @Prop() readonly size?: PictureSize = 'large';

  connectedCallback() {
    this.validateCompany();
  }

  render() {
    const username = [this.firstname, this.lastname].filter(name => !!name).join(' ');
    return (
      <Host>
        <post-avatar-picture
          email={this.email}
          firstname={this.firstname}
          lastname={this.lastname}
          size={this.size}
        ></post-avatar-picture>
        <div class="userInfo">
          {username && <span class="userInfo__username">{username}</span>}
          {this.company && <span class="userInfo__company">{this.company}</span>}
        </div>
      </Host>
    );
  }
}
