import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkNonEmpty, checkOneOf } from '@/utils';
import aiconizer from './aiconizer';

// https://docs.gravatar.com/api/avatars/images/
const GRAVATAR_DEFAULT = '404';
const GRAVATAR_RATING = 'g';

const GRAVATAR_BASE_URL = `https://www.gravatar.com/avatar/{email}?s={size}&d=${GRAVATAR_DEFAULT}&r=${GRAVATAR_RATING}`;

enum AvatarType {
  Gravatar = 'gravatar',
  Initials = 'initials',
  Null = null,
}

@Component({
  tag: 'post-avatar',
  styleUrl: 'post-avatar.scss',
  shadow: true,
})
export class PostAvatar {
  private static GRAVATAR_SIZES = {
    large: 40,
    small: 32,
  };

  /**
   * Defines the size of the avatar.
   */
  @Prop() readonly size?: 'large' | 'small' = 'large';

  /**
   * Defines the users email address.
   */
  @Prop() readonly email?: string;

  /**
   * Defines the users firstname.
   */
  @Prop() readonly firstname!: string;

  /**
   * Defines the users lastname.
   */
  @Prop() readonly lastname?: string;

  @State() avatarType: AvatarType = null;
  @State() gravatarUrl = '';
  @State() initials = '';

  @Watch('firstname')
  firstnameChanged() {
    checkNonEmpty(this.firstname, 'The `firstname` property of the `post-avatar` is required!');
  }

  @Watch('size')
  sizeChanged() {
    checkOneOf(
      this.size,
      ['large', 'small'],
      'The `size` property of the `post-avatar` must be either `large` or `small`.',
    );
  }

  private async getAvatarType() {
    const storage = window?.sessionStorage;
    const baseRes = { ok: false, url: '' };
    const response = storage ? JSON.parse(storage.getItem(this.email)) ?? baseRes : baseRes;

    if (this.email && !response.ok) {
      try {
        const email = await crypto.subtle
          .digest('SHA-256', new TextEncoder().encode(this.email))
          .then(buffer => {
            return Array.from(new Uint8Array(buffer))
              .map(bytes => bytes.toString(16).padStart(2, '0'))
              .join('');
          });
        const size = (PostAvatar.GRAVATAR_SIZES[this.size] ?? '').toString();
        const gravatarUrl = GRAVATAR_BASE_URL.replace('{size}', size).replace('{email}', email);
        const r = await fetch(gravatarUrl);

        response.ok = r.ok;
        response.url = r.url;

        if (storage) storage.setItem(this.email, JSON.stringify(response));
      } catch (error) {
        console.warn(error);
        console.info('Component will continue without avatar image.');
      }
    }

    if (this.email && response.ok) {
      this.gravatarUrl = response.url;
      this.avatarType = AvatarType.Gravatar;
    } else {
      this.initials = `${this.firstname?.charAt(0) ?? ''}${this.lastname?.charAt(0) ?? ''}`.trim();
      this.avatarType = AvatarType.Initials;
    }
  }

  connectedCallback() {
    aiconizer.register();
  }

  componentDidLoad() {
    this.firstnameChanged();
    this.sizeChanged();
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
          <img src={this.gravatarUrl} alt={`${this.email} gravatar`} />
        )}
        {this.avatarType === 'initials' && <div>{this.initials}</div>}
      </Host>
    );
  }
}
