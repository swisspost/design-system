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
   * - If this.base prop is set -> if absolute: [this.base]/[fileName] / if relative: [baseHref][this.base]/[fileName]
   * - Else if meta[name="design-system-settings"] -> if absolute: [data-post-icon-base]/[fileName] / if relative: [baseHref][data-post-icon-base]/[fileName]
   * - Else if base[href] -> if absolute: [baseHref]/[fileName] / if relative: [currentDomain][baseHref][fileName]
   * - Else use CDN ->[CDN][filename] */

  private getUrl(): string {
    const fileName = `${this.name}.svg`;

    if (!IS_BROWSER && !this.base) {
      return `${CDN_URL}${fileName}`;
    }

    const isAbsolute = (url: string) => /^https?:\/\//.test(url);
    const normalizeUrl = (url: string) => (url && !url.endsWith('/') ? `${url}/` : url);

    const currentDomain = IS_BROWSER ? window.location.origin : '';
    const baseHref = IS_BROWSER
      ? document.querySelector('base[href]')?.getAttribute('href') || ''
      : '';
    const metaIconBase = IS_BROWSER
      ? document.querySelector('meta[name="design-system-settings"]')?.getAttribute('data-post-icon-base') || ''
      : '';

    // Function to build the URL based on baseHref
    const buildUrlWithBase = (relativeUrl: string) => {
      const normalizedHref = normalizeUrl(baseHref);
      const normalizedRelative = normalizeUrl(relativeUrl);
      if (isAbsolute(normalizedHref)) {
        return `${normalizedHref}${normalizedRelative}`;
      }
      return `${currentDomain}${normalizedHref}${normalizedRelative}`;
    };

    // Highest Priority is this.base
    if (this.base) {
      if (isAbsolute(this.base)) {
        return `${normalizeUrl(this.base)}${fileName}`.replace(/([^:])\/\//g, '$1/');
      }
      return `${buildUrlWithBase(this.base)}${fileName}`.replace(/([^:])\/\//g, '$1/');
    }

    // Second Priority is metaIconBase
    if (metaIconBase) {
      if (isAbsolute(metaIconBase)) {
        return `${normalizeUrl(metaIconBase)}${fileName}`.replace(/([^:])\/\//g, '$1/');
      }
      return `${buildUrlWithBase(metaIconBase)}${fileName}`.replace(/([^:])\/\//g, '$1/');
    }

    // Third Priority is base[Href]
    if (baseHref) {
      return `${buildUrlWithBase('')}${fileName}`.replace(/([^:])\/\//g, '$1/');
    }

    // Final Fallback to CDN
    return `${CDN_URL}${fileName}`.replace(/([^:])\/\//g, '$1/');
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
    this.validateName();
    this.validateBase();
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
