import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkEmptyOrUrl } from '@/utils';

/**
 * @slot default - Slot for placing hidden descriptive text. If `url` is set, this text will serve as the accessible name of the link; otherwise, it will be used as the title of the SVG.
 */
@Component({
  tag: 'post-logo',
  styleUrl: 'post-logo.scss',
  shadow: true,
})
export class PostLogo {
  @Element() host: HTMLPostLogoElement;

  /**
   * The URL to which the user is redirected upon clicking the logo.
   */
  @Prop() url: string | URL;

  @Watch('url')
  validateUrl() {
    checkEmptyOrUrl(this, 'url');
  }

  componentDidLoad() {
    this.validateUrl();
    this.checkDescription();
  }

  private checkDescription() {
    if (!this.host.textContent) {
      console.warn(
        'Be sure to add descriptive text in the post-logo to ensure good accessibility of the component.',
      );
    }
  }

  render() {
    const logoLink = this.url && (typeof this.url === 'string' ? this.url : this.url.href);
    const LogoTag = logoLink ? 'a' : 'span';

    return (
      <Host data-version={version}>
        <LogoTag
          class={`logo ${logoLink ? 'logo-link' : ''}`}
          {...(logoLink ? { href: logoLink } : {})}
        >
          <span class="description">
            <slot onSlotchange={() => this.checkDescription()}></slot>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" aria-hidden="true">
            <g id="Logo">
              <rect fill="#ffcc00" x="0" y="0" width="72" height="72" />
              <polygon
                fill="#ff0000"
                points="34,32.3 34,19 19.7,19 19.7,29.1 10,29.1 10,42.9 19.7,42.9 19.7,53 34,53 34,39.7 30.6,39.7 30.6,49.8 23.1,49.8 23.1,39.7 13.4,39.7 13.4,32.3 23.1,32.3 23.1,22.2 30.6,22.2 30.6,32.3"
              />
              <path d="M53.56234,31.10526c0,2.41272-1.99154,4.29475-4.51723,4.29475H45.2v-8.3h3.84511C51.66802,27.1,53.56234,28.78889,53.56234,31.10526z M50.69666,19H36v34h9.2V42.9h5.49666c6.75131,0,11.9971-5.15137,11.9971-11.8057C62.69376,24.39136,57.35099,19,50.69666,19z" />
            </g>
          </svg>
        </LogoTag>
      </Host>
    );
  }
}
