import { Component, h, Host, Prop, State } from '@stencil/core';
import { version } from '@root/package.json';
import sha256 from 'crypto-js/sha256';
import aiconizer from './aiconizer';
import { PictureSize } from '@/components/post-avatar-picture/picture-sizes';

// https://docs.gravatar.com/api/avatars/images/
const GRAVATAR_REQUESTED_IMAGE_SIZE = 40;
const GRAVATAR_REQUESTED_IMAGE_DEFAULT = '404';
const GRAVATAR_REQUESTED_IMAGE_RATING = 'g';

const GRAVATAR_BASE_URL = `https://www.gravatar.com/avatar/{email}?s=${GRAVATAR_REQUESTED_IMAGE_SIZE}&d=${GRAVATAR_REQUESTED_IMAGE_DEFAULT}&r=${GRAVATAR_REQUESTED_IMAGE_RATING}`;

@Component({
  tag: 'post-avatar-picture',
  styleUrl: 'post-avatar-picture.scss',
  shadow: true,
})
export class PostAvatarPicture {
  /**
   * Defines the size of the avatar-picture.
   */
  @Prop() readonly size?: PictureSize = 'large';

  /**
   * Defines the users email address.
   */
  @Prop() readonly email?: string;

  /**
   * Defines the users firstname.
   */
  @Prop() readonly firstname?: string;

  /**
   * Defines the users lastname.
   */
  @Prop() readonly lastname?: string;

  @State() avatarType: 'gravatar' | 'initials' | 'fallback' | null = null;
  @State() gravatarUrl = '';
  @State() initials = '';

  private async getAvatarType() {
    let response = { ok: false, url: null };

    if (this.email) {
      const gravatarUrl = GRAVATAR_BASE_URL.replace('{email}', sha256(this.email));
      response = await fetch(gravatarUrl);
    }

    if (this.email && response.ok) {
      this.gravatarUrl = response.url;
      this.avatarType = 'gravatar';
    } else if (this.firstname || this.lastname) {
      this.initials = `${this.firstname?.charAt(0) ?? ''}${this.lastname?.charAt(0) ?? ''}`.trim();
      this.avatarType = 'initials';
    } else {
      this.avatarType = 'fallback';
    }
  }

  connectedCallback() {
    aiconizer.register();
  }

  componentWillRender() {
    this.getAvatarType();
  }

  disconnectedCallback() {
    aiconizer.destroy();
  }

  render() {
    return (
      <Host data-version={version} class={this.size}>
        {this.avatarType === 'gravatar' && (
          <img src={this.gravatarUrl} alt="gravatar profile picture" />
        )}
        {this.avatarType === 'initials' && <div>{this.initials}</div>}
        {this.avatarType === 'fallback' && <post-icon name="3260"></post-icon>}
      </Host>
    );
  }
}
