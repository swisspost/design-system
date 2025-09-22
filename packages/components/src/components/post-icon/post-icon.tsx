import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import { IS_BROWSER, checkEmptyOrType, checkRequiredAndType, checkEmptyOrOneOf } from '@/utils';
import { version } from '@root/package.json';

const CDN_URL = `https://unpkg.com/@swisspost/design-system-icons@${version}/public/post-icons/`;
const ANIMATION_NAMES = [
  'cylon',
  'cylon-vertical',
  'spin',
  'spin-reverse',
  'fade',
  'throb',
] as const;
const ANIMATION_KEYS = [...ANIMATION_NAMES];

type Animation = (typeof ANIMATION_NAMES)[number];

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
  @Prop() readonly animation?: Animation;

  @Watch('animation')
  validateAnimation() {
    checkEmptyOrOneOf(this, 'animation', ANIMATION_KEYS);
  }

  /**
   * The base path, where the icons are located (must be a public url).<br/>Leave this field empty to use the default cdn url.
   */
  @Prop() readonly base?: string;

  @Watch('base')
  validateBase() {
    checkEmptyOrType(this, 'base', 'string');
  }

  /**
   * When set to `true`, the icon will be flipped horizontally.
   */
  @Prop() readonly flipH?: boolean = false;

  /**
   * When set to `true`, the icon will be flipped vertically.
   */
  @Prop() readonly flipV?: boolean = false;

  /**
   * The name/id of the icon (e.g. 1000, 1001, ...).
   */
  @Prop({ reflect: true }) readonly name!: string;

  @Watch('name')
  validateName() {
    if (this.name) checkRequiredAndType(this, 'name', 'string');
  }

  /**
   * The number of degree for the css rotate transformation.
   */
  @Prop() readonly rotate?: number;

  @Watch('rotate')
  validateRotate() {
    checkEmptyOrType(this, 'rotate', 'number');
  }

  /**
   * The number for the css scale transformation.
   */
  @Prop() readonly scale?: number;

  @Watch('scale')
  validateScale() {
    checkEmptyOrType(this, 'scale', 'number');
  }

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
    const fileName = `${this.name}.svg`;

    if (!IS_BROWSER && !this.base) {
      return `${CDN_URL}${fileName}`;
    }

    const isAbsolute = (url: string) => /^https?:\/\//.test(url);
    const normalizeUrl = (url: string) => (url && !url.endsWith('/') ? `${url}/` : url);
    const cleanUrl = (url: string) => url.replace(/([^:])\/\//g, '$1/');

    const currentDomain = IS_BROWSER ? window.location.origin : '';
    const baseHref = IS_BROWSER
      ? document.querySelector('base[href]')?.getAttribute('href') || ''
      : '';
    const metaIconBase = IS_BROWSER
      ? document
        .querySelector('meta[name="design-system-settings"]')
        ?.getAttribute('data-post-icon-base') || ''
      : '';

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

    return Object.entries({
      '-webkit-mask-image': `url(${url})`,
      'mask-image': `url('${url}')`,
      'transform':
        (this.scale && !isNaN(Number(this.scale)) ? 'scale(' + this.scale + ')' : '') +
        (this.rotate && !isNaN(Number(this.rotate)) ? ' rotate(' + this.rotate + 'deg)' : ''),
    })
      .filter(([_key, value]) => value !== null)
      .reduce((styles, [key, value]) => Object.assign(styles, { [key]: value }), {});
  }

  componentDidLoad() {
    this.validateBase();
    this.validateName();
    this.validateScale();
    this.validateRotate();
    this.validateAnimation();
  }

  render() {
    return (
      <Host data-version={version}>
        <span style={this.getStyles()}></span>
      </Host>
    );
  }
}
