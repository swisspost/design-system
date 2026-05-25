import { ANIMATION_KEYS, PostIconAnimation } from '@/types/icon-animations';
import { OneOf, Required, Type } from '@/utils';
import { version } from '@root/package.json';
import { Build, Component, Element, h, Host, Prop } from '@stencil/core';

const CDN_URL = `https://unpkg.com/@swisspost/design-system-icons@${version}/public/post-icons/`;

/**
 * @class PostIcon - representing a stencil component
 */

@Component({
  tag: 'post-icon',
  styleUrl: 'post-icon.scss',
  shadow: true,
})
export class PostIcon {
  @Element() host: HTMLPostIconElement;

  /**
   * The name of the animation.
   */
  @OneOf(ANIMATION_KEYS)
  @Prop({ reflect: true })
  readonly animation?: PostIconAnimation;

  /**
   * The base path, where the icons are located (must be a public url).<br/>Leave this field empty to use the default cdn url.
   */
  @Type('string')
  @Prop()
  readonly base?: string;

  /**
   * A full URL to the icon file. When set, this property has the highest priority.
   */
  @Prop() readonly url?: string;

  /**
   * When set to `true`, the icon will be flipped horizontally.
   */
  @Prop({ reflect: true }) readonly flipH?: boolean = false;

  /**
   * When set to `true`, the icon will be flipped vertically.
   */
  @Prop({ reflect: true }) readonly flipV?: boolean = false;

  /**
   * The name/id of the icon (e.g. 1000, 1001, ...).
   */
  @Required()
  @Type('string')
  @Prop({ reflect: true })
  readonly name!: string;

  /**
   * The number of degree for the css rotate transformation.
   */
  @Type('number')
  @Prop()
  readonly rotate?: number;

  /**
   * The number for the css scale transformation.
   */
  @Type('number')
  @Prop()
  readonly scale?: number;

  /**
   * Construct the icon URL according to the following rules:
   * 1. `@base` (absolute URL) → use directly.
   * 2. `@base` (relative URL) → resolve with `base href` and/or `origin`
   *  - If `base href` is absolute → use just that.
   *  - If `base href` is relative → prepend with `origin`.
   *  - If `base href` does not exist → use only `origin`.
   * 3. `@meta` (absolute URL) → use directly.
   * 4. `@meta` (relative URL) → resolve with `base href` and/or `origin`. (same as above)
   * 5. `CDN_URL` fallback → `https://unpkg.com/...`.
   **/

  private getUrl(): string {
    const name = this.name ?? this.host.getAttribute('name');
    const fileName = `${name}.svg`;

    // Prioritize only data:image URLs
    if (this.url?.startsWith('data:image/')) {
      return this.url;
    }

    if (Build.isServer && !this.base) {
      return `${CDN_URL}${fileName}`;
    }

    if (this.url) {
      return this.url;
    }

    const isAbsolute = (url: string) => /^https?:\/\//.test(url);
    const normalizeUrl = (url: string) => (url && !url.endsWith('/') ? `${url}/` : url);
    const cleanUrl = (url: string) => url.replaceAll(/([^:])\/\//g, '$1/');

    const currentDomain = Build.isBrowser ? globalThis.location.origin : '';
    const baseHref = Build.isBrowser
      ? document.querySelector('base[href]')?.getAttribute('href') || ''
      : '';

    let metaIconBase = '';
    if (Build.isBrowser) {
      const metaTag = document.querySelector('meta[name="design-system-settings"]');
      metaIconBase = metaTag?.getAttribute('data-post-icon-base') || '';
    }

    // Function to build the first part of the URL when 'this.base' or 'metaIconBase' are relative
    const buildUrlWithBase = (relativeUrl: string) => {
      const normalizedHref = normalizeUrl(baseHref);
      const normalizedRelative = normalizeUrl(relativeUrl);
      if (isAbsolute(normalizedHref)) {
        return `${normalizedHref}${normalizedRelative}`;
      }
      return `${currentDomain}${normalizedHref}${normalizedRelative}`;
    };

    let url: string;

    // Highest Priority is this.base
    if (this.base) {
      url = isAbsolute(this.base)
        ? `${normalizeUrl(this.base)}${fileName}`
        : `${buildUrlWithBase(this.base)}${fileName}`;
      return cleanUrl(url);
    }

    // Second Priority is metaIconBase
    if (metaIconBase) {
      url = isAbsolute(metaIconBase)
        ? `${normalizeUrl(metaIconBase)}${fileName}`
        : `${buildUrlWithBase(metaIconBase)}${fileName}`;
      return cleanUrl(url);
    }

    // Fallback to CDN
    return cleanUrl(`${CDN_URL}${fileName}`);
  }

  private getStyles() {
    const url = this.getUrl();

    return Object.fromEntries(
      Object.entries({
        '-webkit-mask-image': `url(${url})`,
        'mask-image': `url('${url}')`,
        'transform':
          (this.scale && !Number.isNaN(Number(this.scale)) ? 'scale(' + this.scale + ')' : '') +
          (this.rotate && !Number.isNaN(Number(this.rotate))
            ? ' rotate(' + this.rotate + 'deg)'
            : ''),
      }).filter(([_key, value]) => value !== null),
    );
  }

  render() {
    return (
      <Host data-version={version}>
        <span style={this.getStyles()}></span>
      </Host>
    );
  }
}
