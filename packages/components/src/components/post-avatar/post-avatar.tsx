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

interface AvatarStorage {
  url: string;
  useridImageFailed: boolean;
  useridImageFailedReason: string;
  emailImageFailed: boolean;
  emailImageFailedReason: string;
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
  private static readonly INTERNAL_USERID_IMAGE_SRC =
    'https://web.post.ch/UserProfileImage/{userid}.png';

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
  @State() storageKey: string = '';

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
  }

  @Watch('email')
  validateEmail() {
    if (this.email) checkEmptyOrPattern(this, 'email', emailPattern);
  }

  @Watch('email')
  @Watch('userid')
  async keyChanged() {
    this.storageKey = `${this.userid || ''}_${this.email || ''}`;

    // Reset previous avatar
    this.imageUrl = '';
    this.imageAlt = '';
    this.avatarType = AvatarType.Initials;
    await this.setInitialStorage();
    this.getAvatar();
  }

  private async setInitialStorage() {
    const key = await this.cryptify(this.storageKey);
    const cached = sessionStorage.getItem(key);
    if (!cached) {
      const initial: AvatarStorage = {
        url: null,
        useridImageFailed: null,
        useridImageFailedReason: null,
        emailImageFailed: null,
        emailImageFailedReason: null,
      };
      sessionStorage.setItem(key, JSON.stringify(initial));
    }
  }

  private async updateStorage(partialUpdate: Partial<AvatarStorage>) {
    const key = await this.cryptify(this.storageKey);
    const cached = sessionStorage.getItem(key);
    const existing: AvatarStorage = cached ? JSON.parse(cached) : ({} as AvatarStorage);
    const updated: AvatarStorage = { ...existing, ...partialUpdate };
    sessionStorage.setItem(key, JSON.stringify(updated));
  }

  private async getAvatar() {
    if (this.slottedImage !== null) {
      this.avatarType = AvatarType.Slotted;
    } else {
      let imageLoaded = false;

      if (this.userid) {
        imageLoaded = await this.getImageByProp(
          this.userid,
          this.fetchImageByUserId.bind(this),
          'userid',
        );
      }

      if (!imageLoaded && this.email) {
        const emailLoaded = await this.getImageByProp(
          this.email,
          this.fetchImageByEmail.bind(this),
          'email',
        );
        if (!emailLoaded) this.getAvatarByInitials();
      }
    }
  }

  private setupImage(imageResponseURL: Response['url']) {
    this.imageUrl = imageResponseURL;
    this.imageAlt = `${this.firstname} ${this.lastname} avatar`;
    this.avatarType = AvatarType.Image;
  }

  private async getImageByProp(
    prop: string,
    fetchImage: () => Promise<Response>,
    type: 'userid' | 'email',
  ) {
    if (!prop) return false;

    const key = await this.cryptify(this.storageKey);
    const cached = sessionStorage.getItem(key);
    const existing: AvatarStorage = cached ? JSON.parse(cached) : null;

    // Skip the fetch if an image exists for this combination
    if (existing?.url) {
      this.setupImage(existing?.url);
      return true;
    }

    try {
      const response = await fetchImage();

      if (response.ok) {
        this.setupImage(response.url);
        await this.updateStorage({
          url: response.url,
          [`${type}ImageFailed`]: false,
          [`${type}ImageFailedReason`]: '',
        });
        return true;
      } else {
        const reason = `Fetch failed with status ${response.status}`;
        await this.updateStorage({
          [`${type}ImageFailed`]: true,
          [`${type}ImageFailedReason`]: reason,
        });
        return false;
      }
    } catch (error) {
      const reason = (error as Error).message;
      console.info(`Network error for ${type}`, error);
      this.updateStorage({
        [`${type}ImageFailed`]: true,
        [`${type}ImageFailedReason`]: reason,
      });
      return false;
    }
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

  private async cryptify(key: string) {
    return await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key)).then(buffer => {
      return Array.from(new Uint8Array(buffer))
        .map(bytes => bytes.toString(16).padStart(2, '0'))
        .join('');
    });
  }

  private onSlotDefaultChange() {
    this.slottedImage = this.host.querySelector('img');
    if (this.slottedImage) {
      this.avatarType = AvatarType.Slotted;
    } else {
      this.avatarType = AvatarType.Initials;
      this.getAvatar();
    }
  }

  componentWillRender() {
    this.slottedImage = this.host.querySelector('img');
  }

  componentWillLoad() {
    // Immediately set to initials
    this.getAvatarByInitials();
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
