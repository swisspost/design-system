import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkNonEmpty } from '@/utils';

// https://docs.gravatar.com/api/avatars/images/
const GRAVATAR_DEFAULT = '404';
const GRAVATAR_RATING = 'g';
const GRAVATAR_SIZE = 80;

const GRAVATAR_BASE_URL = `https://www.gravatar.com/avatar/{email}?s=${GRAVATAR_SIZE}&d=${GRAVATAR_DEFAULT}&r=${GRAVATAR_RATING}`;

enum AvatarType {
  Slotted = 'slotted',
  Image = 'image',
  Initials = 'initials',
  Null = null,
}

/**
 * @slot default - Slot for inserting a custom image as avatar.
 */
@Component({
  tag: 'post-avatar',
  styleUrl: 'post-avatar.scss',
  shadow: true,
})
export class PostAvatar {
  private static INTERNAL_USERID_IMAGE_SRC = 'https://web.post.ch/UserProfileImage/{userid}.png';

  @Element() host: HTMLPostAvatarElement;

  /**
   * Defines the users firstname.
   */
  @Prop() readonly firstname!: string;

  /**
   * Defines the users lastname.
   */
  @Prop() readonly lastname?: string;

  /**
   * Defines the company internal userId.<div className="mb-1 banner banner-warning banner-sm">Can only be used on post.ch domains!</div>
   */
  @Prop() readonly userid?: string;

  /**
   * Defines the users email address associated with a gravatar profile picture.
   */
  @Prop() readonly email?: string;

  @State() slottedImage: HTMLImageElement;
  @State() avatarType: AvatarType = null;
  @State() imageUrl = '';
  @State() imageAlt = '';
  @State() initials = '';

  @Watch('firstname')
  validateFirstname() {
    checkNonEmpty(this, 'firstname');
  }

  private async getAvatar() {
    if (this.slottedImage !== null) {
      this.avatarType = AvatarType.Slotted;
    } else {
      let imageLoaded = false;

      if (!imageLoaded && this.userid)
        imageLoaded = await this.getImageByProp(this.userid, this.fetchImageByUserId.bind(this));

      if (!imageLoaded && this.email)
        imageLoaded = await this.getImageByProp(this.email, this.fetchImageByEmail.bind(this));

      if (!imageLoaded) this.getAvatarByInitials();
    }
  }

  private async getImageByProp(prop: string, fetchImage: () => Promise<Response>) {
    if (!prop) return false;

    const imageResponse = (await this.getStorageItem(prop)) ?? { ok: false, url: '' };

    if (!imageResponse.ok) {
      try {
        const r = await fetchImage();

        imageResponse.ok = r.ok;
        imageResponse.url = r.url;

        this.imageUrl = imageResponse.url;
        this.imageAlt = `${this.firstname} ${this.lastname} avatar`;
        this.avatarType = AvatarType.Image;

        this.setStorageItem(this.userid, JSON.stringify(imageResponse));
      } catch (error) {
        this.removeStorageItem(prop);
        console.info(`Loading avatar by type "${AvatarType.Image}" failed.`);
      }
    }

    return imageResponse.ok;
  }

  private async fetchImageByUserId() {
    return await fetch(
      PostAvatar.INTERNAL_USERID_IMAGE_SRC.replace('{userid}', encodeURIComponent(this.userid)),
    );
  }

  private async fetchImageByEmail() {
    const email = await this.cryptify(this.email);
    const imageUrl = GRAVATAR_BASE_URL.replace('{email}', email);
    return await fetch(imageUrl);
  }

  private getAvatarByInitials() {
    this.initials = this.getInitials();
    this.avatarType = AvatarType.Initials;
  }

  private getNames() {
    return [this.firstname, this.lastname].filter(n => n);
  }

  private getInitials() {
    return this.getNames()
      .map(n => n.charAt(0))
      .join('')
      .trim();
  }

  private async getStorageItem(keyToken: string) {
    const key = await this.cryptify(keyToken);
    const value = window?.sessionStorage?.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  private async setStorageItem(keyToken: string, value: string) {
    const key = await this.cryptify(keyToken);
    window?.sessionStorage?.setItem(key, value);
  }

  private async removeStorageItem(keyToken: string) {
    const key = await this.cryptify(keyToken);
    window?.sessionStorage?.removeItem(key);
  }

  private async cryptify(key: string) {
    return await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key)).then(buffer => {
      return Array.from(new Uint8Array(buffer))
        .map(bytes => bytes.toString(16).padStart(2, '0'))
        .join('');
    });
  }

  private onSlotDefaultChange() {
    this.slottedImage = this.host.querySelector('img');
    this.getAvatar();
  }

  componentWillRender() {
    this.slottedImage = this.host.querySelector('img');
    this.getAvatar();
  }

  componentDidLoad() {
    this.validateFirstname();
  }

  render() {
    const initials = this.getNames().reduce((acc, n, i) => {
      if (i > 0) acc.push(<span> </span>);
      acc.push(n.charAt(0));
      acc.push(<span>{n.slice(1)}</span>);
      // eslint-disable-next-line @stencil-community/render-returns-host
      return acc;
    }, []);

    return (
      <Host data-version={version}>
        <slot onSlotchange={this.onSlotDefaultChange.bind(this)}>
          {this.avatarType === 'image' && <img src={this.imageUrl} alt={this.imageAlt} />}
          {this.avatarType === 'initials' && <div class="initials">{initials}</div>}
        </slot>
      </Host>
    );
  }
}
