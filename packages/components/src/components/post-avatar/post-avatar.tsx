import { Pattern, Required, Type } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { getGravatarUrl } from './avatar-utils';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

enum AvatarType {
  Slotted = 'slotted',
  Image = 'image',
  Initials = 'initials',
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
  private slottedImage: HTMLImageElement | null = null;
  private slottedImageObserver?: MutationObserver; // To watch the slotted image src.

  @Element() host!: HTMLPostAvatarElement;

  /**
   * Defines the users firstname.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  readonly firstname!: string;

  /**
   * Defines the users lastname.
   */
  @Prop()
  @Type('string')
  readonly lastname?: string;

  /**
   * Defines the users email address associated with a gravatar profile picture.
   */
  @Prop()
  @Pattern(emailPattern)
  readonly email?: string;

  /**
   * Provides a custom description for the avatar, used for accessibility purposes.
   */
  @Prop()
  @Type('string')
  description?: string;

  @State() avatarType: AvatarType = AvatarType.Initials;
  @State() imageUrl = '';
  @State() imageAlt = '';

  @Watch('email')
  updateEmail() {
    this.getAvatarImage();
  }

  private async getAvatarImage() {
    let imageLoaded = false;
    this.slottedImage = this.host.querySelector('img');
    const imageUrl = this.slottedImage?.getAttribute('src');

    if (!imageUrl) {
      this.imageUrl = '';
      if (this.email?.match(emailPattern)) {
        imageLoaded = await this.getImageByProp(this.email, this.fetchImageByEmail.bind(this));
      }
      if (!imageLoaded) {
        this.avatarType = AvatarType.Initials;
      }
    } else {
      this.imageUrl = '';
      const slottedImageLoaded = await this.getImageByProp(
        imageUrl,
        this.fetchSlottedImage.bind(this),
        AvatarType.Slotted,
      );

      if (!slottedImageLoaded) {
        this.hideSlottedImage();
      } else {
        this.showSlottedImage();
      }
    }
  }

  private async getImageByProp(
    prop: string,
    loadImage: (prop: string) => Promise<string>,
    avatarType = AvatarType.Image,
  ) {
    if (!prop) return false;

    try {
      const imageUrl = await loadImage(prop);

      if (avatarType === AvatarType.Image) {
        this.imageUrl = imageUrl;
        this.imageAlt = `${this.firstname} ${this.lastname} avatar`;
      }

      this.avatarType = avatarType;
      return true;
    } catch (error) {
      console.info('Loading avatar image failed.', error);
      return false;
    }
  }

  private async fetchImageByEmail(email: string) {
    return await this.loadImage(await getGravatarUrl(email));
  }

  private async fetchSlottedImage(imageUrl: string) {
    return await this.loadImage(imageUrl);
  }

  private loadImage(imageUrl: string) {
    return new Promise<string>((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(imageUrl), { once: true });
      image.addEventListener('error', () => reject(new Error(`Could not load ${imageUrl}`)), {
        once: true,
      });
      image.src = imageUrl;
    });
  }

  private showSlottedImage = () => {
    if (!this.slottedImage) return;
    this.slottedImage.style.display = 'block';
    this.avatarType = AvatarType.Slotted;
  };

  private hideSlottedImage = () => {
    if (this.slottedImage) this.slottedImage.style.display = 'none';
    this.avatarType = AvatarType.Initials;
  };

  private slotChanged() {
    const slot = this.host.shadowRoot?.querySelector('slot');
    const assignedNodes = slot?.assignedNodes({ flatten: true }) || [];

    assignedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        if (el.tagName === 'IMG') {
          this.observeSlottedImage(el as HTMLImageElement);
        }
      }
    });

    this.getAvatarImage();
  }

  // Observe the Slotted image src attribute and update the image
  private observeSlottedImage(img: HTMLImageElement) {
    this.disconnectSlottedImage();

    img.addEventListener('load', this.showSlottedImage);
    img.addEventListener('error', this.hideSlottedImage);

    this.slottedImageObserver = new MutationObserver(() => this.getAvatarImage());
    this.slottedImageObserver.observe(img, { attributes: true, attributeFilter: ['src'] });
  }

  private disconnectSlottedImage() {
    this.slottedImageObserver?.disconnect();

    if (this.slottedImage) {
      this.slottedImage.removeEventListener('load', this.showSlottedImage);
      this.slottedImage.removeEventListener('error', this.hideSlottedImage);
    }
  }

  connectedCallback() {
    //This provides a fallback by showing the initials while the image is still loading or delayed.
    this.avatarType = AvatarType.Initials;
    this.getAvatarImage();
  }

  disconnectedCallback() {
    this.disconnectSlottedImage();
  }

  render() {
    const names = [this.firstname, this.lastname]
      .filter((name): name is string => typeof name === 'string')
      .map(name => name.trim());
    const initials = names
      .map(n => n.charAt(0))
      .join('')
      .trim();
    const fullname = names.join(' ');

    return (
      <Host data-version={version}>
        <span>
          <slot onSlotchange={this.slotChanged.bind(this)}></slot>
        </span>
        {this.avatarType === AvatarType.Image && <img src={this.imageUrl} alt={this.imageAlt} />}
        {this.avatarType === AvatarType.Initials && (
          <span class="initials">
            {initials}
            <span>{this.description ?? fullname}</span>
          </span>
        )}
      </Host>
    );
  }
}
