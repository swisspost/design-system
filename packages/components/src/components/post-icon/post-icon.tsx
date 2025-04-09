import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import { IS_BROWSER, checkNonEmpty, checkType, checkEmptyOrType, checkEmptyOrOneOf } from '@/utils';
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
  @Prop() readonly animation?: Animation | null = null;

  @Watch('animation')
  validateAnimation(newValue = this.animation) {
    if (newValue !== undefined) checkEmptyOrOneOf(this, 'animation', ANIMATION_KEYS);
  }

  /**
   * The base path, where the icons are located (must be a public url).<br/>Leave this field empty to use the default cdn url.
   */
  @Prop() readonly base?: string | null = null;

  @Watch('base')
  validateBase() {
    checkEmptyOrType(this, 'base', 'string');
  }

  /**
   * When set to `true`, the icon will be flipped horizontally.
   */
  @Prop() readonly flipH?: boolean = false;

  @Watch('flipH')
  validateFlipH() {
    checkEmptyOrType(this, 'flipH', 'boolean');
  }

  /**
   * When set to `true`, the icon will be flipped vertically.
   */
  @Prop() readonly flipV?: boolean = false;

  @Watch('flipV')
  validateFlipV() {
    checkEmptyOrType(this, 'flipV', 'boolean');
  }

  /**
   * The name/id of the icon (e.g. 1000, 1001, ...).
   */
  @Prop({ reflect: true }) readonly name!: string;

  @Watch('name')
  validateName() {
    checkNonEmpty(this, 'name');
    checkType(this, 'name', 'string');
  }

  /**
   * The number of degree for the css rotate transformation.
   */
  @Prop() readonly rotate?: number | null = null;

  @Watch('rotate')
  validateRotate() {
    checkEmptyOrType(this, 'rotate', 'number');
  }

  /**
   * The number for the css scale transformation.
   */
  @Prop() readonly scale?: number | null = null;

  @Watch('scale')
  validateScale() {
    checkEmptyOrType(this, 'scale', 'number');
  }

  // Construct the icon URL according to the following rules:
  // - URL = current domain + base[href] + meta[data-post-icon-base] (or component base)
  // - If base[href] is not relative, it's used instead of current domain + base[href]
  // - If meta[data-post-icon-base] (or component base) is not relative, it's used as is
  private getUrl(): string {
    const fileName = `${this.name}.svg`;

    if (!IS_BROWSER && !this.base) {
      return `${CDN_URL}${fileName}`;
    }

    const currentDomain = IS_BROWSER ? window.location.origin : '';

    const baseHref = IS_BROWSER
      ? document.querySelector('base[href]')?.getAttribute('href') || ''
      : '';
    const isBaseHrefAbsolute = /^https?:\/\//.test(baseHref);

    const iconBase =
      this.base ||
      (IS_BROWSER
        ? document
          .querySelector('meta[name="design-system-settings"]')
          ?.getAttribute('data-post-icon-base') || ''
        : '');
    const isIconBaseAbsolute = /^https?:\/\//.test(iconBase);

    const normalizedBaseHref = baseHref ? (baseHref.endsWith('/') ? baseHref : `${baseHref}/`) : '';
    const normalizedIconBase = iconBase ? (iconBase.endsWith('/') ? iconBase : `${iconBase}/`) : '';

    let url: string;

    if (isIconBaseAbsolute) {
      // If icon base is absolute, use it as is
      url = `${normalizedIconBase}${fileName}`;
    } else if (isBaseHrefAbsolute) {
      // If baseHref is absolute, don't use current domain
      url = `${normalizedBaseHref}${normalizedIconBase}${fileName}`;
    } else if (iconBase || baseHref) {
      // Standard case: domain + baseHref + iconBase
      url = `${currentDomain}${normalizedBaseHref}${normalizedIconBase}${fileName}`;
    } else {
      // Fallback to CDN if no paths are specified
      url = `${CDN_URL}${fileName}`;
    }

    return url.replace(/([^:])\/\//g, '$1/');
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
    this.validateFlipH();
    this.validateFlipV();
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
