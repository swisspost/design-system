import { Pattern, Required, Type } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { cryptify, GRAVATAR_BASE_URL } from './avatar-utils';

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
  private slottedImageObserver: MutationObserver; // To watch the slotted image src.

  @Element() host: HTMLPostAvatarElement;

  /**
   * Defines the users firstname.
   */
  @Required()
  @Type('string')
  @Prop({ reflect: true })
  readonly firstname!: string;

  /**
   * Defines the users lastname.
   */
  @Type('string')
  @Prop()
  readonly lastname?: string;

  /**
   * Defines the users email address associated with a gravatar profile picture.
   */
  @Pattern(emailPattern)
  @Prop()
  readonly email?: string;

  /**
   * Provides a custom description for the avatar, used for accessibility purposes.
   */
  @Type('string')
  @Prop()
  description?: string;

  @State() slottedImage: HTMLImageElement;
  @State() avatarType: AvatarType = null;
  @State() imageUrl = '';
  @State() imageAlt = '';
  @State() initials = '';

  // To handle email updates and reset the storage item
  @State() storageKey: string = '';

  @Watch('email')
  updateEmail() {
    this.getAvatarImage();
  }

  private async getAvatarImage() {
    let imageLoaded = false;
    this.slottedImage = this.host.querySelector('img');
    const imageUrl = this.slottedImage?.getAttribute('src');

    if (!imageUrl) {
      if (this.email?.match(emailPattern)) {
        imageLoaded = await this.getImageByProp(this.email, this.fetchImageByEmail.bind(this));
      }
      if (!imageLoaded) {
        this.avatarType = AvatarType.Initials;
      }
    } else {
      const slottedImageLoaded = await this.getImageByProp(
        imageUrl,
        this.fetchSlottedImage.bind(this),
      );

      if (!slottedImageLoaded) {
        this.slottedImage.style.display = 'none';
        this.avatarType = AvatarType.Initials;
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

  private async fetchImageByEmail() {
    const email = await cryptify(this.email);
    const imageUrl = GRAVATAR_BASE_URL.replace('{email}', email);
    return await fetch(imageUrl);
  }

  private async fetchSlottedImage(imageUrl: string) {
    return await fetch(imageUrl, { method: 'HEAD' });
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
    this.avatarType = AvatarType.Initials;
    this.getAvatarImage();
  }

  render() {
    const names = [this.firstname, this.lastname].filter(Boolean).map(n => n.trim());
    const initials = names
      .map(n => n.charAt(0))
      .join('')
      .trim();
    const fullname = names.join(' ');

    return (
      <Host data-version={version}>
        <span class={this.avatarType === 'slotted' ? '' : 'd-none'}>
          <slot onSlotchange={this.slotChanged.bind(this)}></slot>
        </span>
        {this.avatarType === 'image' && <img src={this.imageUrl} alt={this.imageAlt} />}
        {this.avatarType === 'initials' && (
          <span class="initials">
            {initials}
            <span>{this.description ?? fullname}</span>
          </span>
        )}
      </Host>
    );
  }
}
