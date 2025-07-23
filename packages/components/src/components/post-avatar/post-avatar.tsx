import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType, checkEmptyOrPattern, checkEmptyOrType } from '@/utils';

// https://docs.gravatar.com/api/avatars/images/
const GRAVATAR_DEFAULT = '404';
const GRAVATAR_RATING = 'g';
const GRAVATAR_SIZE = 80;

const GRAVATAR_BASE_URL = `https://www.gravatar.com/avatar/{email}?s=${GRAVATAR_SIZE}&d=${GRAVATAR_DEFAULT}&r=${GRAVATAR_RATING}`;

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
  @Prop({ reflect: true }) readonly firstname!: string;

  /**
   * Defines the users lastname.
   */
  @Prop() readonly lastname?: string;

  /**
   * Defines the company internal userId.<div className="mb-4 banner banner-warning banner-sm">Can only be used on post.ch domains!</div>
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

  // To handle email or userid updates and reset the storage item
  @State() private storageKeyTrigger: string = '';

  private updateStorageKeyTrigger() {
    // Combine relevant props into a single string.
    this.storageKeyTrigger = `${this.userid || ''}_${this.email || ''}`;
  }

  @Watch('firstname')
  validateFirstname() {
    checkRequiredAndType(this, 'firstname', 'string');
  }

  @Watch('lastname')
  validateLastname() {
    checkEmptyOrType(this, 'lastname', 'string');
  }

  @Watch('userid')
  validateUserid() {
    checkEmptyOrType(this, 'userid', 'string');
    this.updateStorageKeyTrigger();
  }

  @Watch('email')
  validateEmail() {
    if (this.email) checkEmptyOrPattern(this, 'email', emailPattern);
    this.updateStorageKeyTrigger();
  }

  @Watch('storageKeyTrigger')
  onStorageKeyChanged() {
    if (this.storageKeyTrigger !== '') this.refreshAvatar();
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
  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async getImageByProp(prop: string, fetchImage: () => Promise<Response>) {
    if (!prop) return false;

    const cachedImageRes = await this.getStorageItem(prop);
    if (cachedImageRes?.failed) return false;

    if (cachedImageRes?.ok && cachedImageRes.url) {
      this.imageUrl = cachedImageRes.url;
      this.imageAlt = `${this.firstname} ${this.lastname} avatar`;
      this.avatarType = AvatarType.Image;
      return true;
    }

    const maxRetries = 2;
    let delayMs = 100;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetchImage();

        if (response.ok) {
          this.imageUrl = response.url;
          this.imageAlt = `${this.firstname} ${this.lastname} avatar`;
          this.avatarType = AvatarType.Image;
          await this.setStorageItem(
            prop,
            JSON.stringify({ ok: true, url: response.url, failed: false }),
          );
          return true;
        } else {
          // If it's a 404 set as failed
          if (response.status === 404) {
            await this.setStorageItem(prop, JSON.stringify({ failed: true }));
            console.info('Avatar not found (404).');
            return false;
          }

          // For other HTTP errors retry
          console.info(`Attempt ${attempt}: Loading avatar failed with status ${response.status}.`);
        }
      } catch (error) {
        console.info(`Attempt ${attempt}: Network error or fetch failed.`, error);
      }

      if (attempt < maxRetries) {
        await this.delay(delayMs);
        delayMs *= 2; // exponential backoff (3 attempts)
      }
    }

    // After retries exhausted, mark as failed
    await this.setStorageItem(prop, JSON.stringify({ failed: true }));
    console.info(
      `Loading avatar by type "${AvatarType.Image}" failed after ${maxRetries} attempts.`,
    );
    return false;
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

  private async refreshAvatar() {
    await this.removeStorageItem(this.userid);
    await this.removeStorageItem(this.email);
    this.getAvatar();
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
  }

  componentWillLoad() {
    this.validateFirstname();
    this.validateLastname();
    this.validateUserid();
    this.validateEmail();
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
