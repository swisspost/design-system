import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType, checkEmptyOrPattern, checkEmptyOrType } from '@/utils';
import { GRAVATAR_BASE_URL } from './avatar-utils';

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
  private static readonly INTERNAL_USERID_IMAGE_SRC =
    'https://web.post.ch/UserProfileImage/{userid}.png';

  private slottedImageObserver: MutationObserver; // To watch the slotted image src.

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
  updateUserid() {
    this.validateUserId();
    this.getAvatarImage();
  }

  @Watch('email')
  updateEmail() {
    this.validateEmail();
    this.getAvatarImage();
  }

  private validateUserId() {
    checkEmptyOrType(this, 'userid', 'string');
  }

  private validateEmail() {
    if (this.email) checkEmptyOrPattern(this, 'email', emailPattern);
  }

  private async getAvatarImage() {
    let imageLoaded = false;
    this.slottedImage = this.host.querySelector('img');
    const imageUrl = this.slottedImage?.getAttribute('src');

    if (!imageUrl) {
      if (this.userid) {
        imageLoaded = await this.getImageByProp(this.userid, this.fetchImageByUserId.bind(this));
      }
      if (!imageLoaded && emailPattern.exec(this.email ?? '') !== null) {
        imageLoaded = await this.getImageByProp(this.email, this.fetchImageByEmail.bind(this));
      }
      if (!imageLoaded) {
        this.getAvatarInitials();
      }
    } else {
      const slottedImageLoaded = await this.getImageByProp(
        imageUrl,
        this.fetchSlottedImage.bind(this),
      );

      if (!slottedImageLoaded) {
        this.slottedImage.style.display = 'none';
        this.getAvatarInitials();
      } else {
        this.slottedImage.style.display = 'block';
      }
    }
  }

  private async getImageByProp(prop: string, fetchImage: (prop?: string) => Promise<Response>) {
    if (!prop) return false;
    let imageResponse: Response;

    try {
      imageResponse = await fetchImage(prop);
    } catch (error) {
      console.info('Loading avatar image failed.', error);
      return false;
    }

    if (!imageResponse?.ok) {
      return false;
    } else {
      this.imageUrl = imageResponse.url;
      this.imageAlt = `${this.firstname} ${this.lastname} avatar`;
      this.avatarType = AvatarType.Image;
      return true;
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

  private async fetchSlottedImage(imageUrl: string) {
    return await fetch(imageUrl, { method: 'HEAD' });
  }

  private getAvatarInitials() {
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

  private slotChanged() {
    const slot = this.host.shadowRoot.querySelector('slot');
    const assignedNodes = slot?.assignedNodes({ flatten: true }) || [];

    assignedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        if (el.tagName === 'IMG') {
          this.observeImageSrcChanges(el as HTMLImageElement);
        }
      }
    });

    this.getAvatarImage();
  }

  // Observe the Slotted image src attribute and update the image
  private observeImageSrcChanges(img: HTMLImageElement) {
    if (this.slottedImageObserver) {
      this.slottedImageObserver.disconnect();
    }
    this.slottedImageObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
          this.getAvatarImage();
        }
      });
    });
    this.slottedImageObserver.observe(img, { attributes: true, attributeFilter: ['src'] });
  }

  connectedCallback() {
    //This provides a fallback by showing the initials while the image is still loading or delayed.
    this.getAvatarInitials();
    this.getAvatarImage();
  }

  componentDidLoad() {
    this.validateFirstname();
    this.validateLastname();
    this.validateUserId();
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
        <span class={this.avatarType === 'slotted' ? '' : 'd-none'}>
          <slot onSlotchange={this.slotChanged.bind(this)}></slot>
        </span>
        {this.avatarType === 'image' && <img src={this.imageUrl} alt={this.imageAlt} />}
        {this.avatarType === 'initials' && <div class="initials">{initials}</div>}
      </Host>
    );
  }
}
