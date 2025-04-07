import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';

import { IS_BROWSER, checkEmptyOrPattern, checkEmptyOrType, checkEmptyOrOneOf } from '@/utils';

import { version } from '@root/package.json';

type UrlDefinition = {
  url: URL | null;
  definesDomain: boolean;
  definesSlug: boolean;
};

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
    checkEmptyOrPattern(
      this,
      'name',
      /\d{4}|none/,
      'The icon "name" prop should be a 4-digit string.',
    );
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

  // Construct the icon url from different possible sources
  private getUrl() {
    let url: string;
    const file = `${this.name}.svg`;

    // the first definition object which defines a domain, will be used to set the domain of the file url
    // the first definition object which defines a slug, will be used to set the slug of the file url
    const urlDefinitions = [this.getUrlDefinition(this.base, 'both')];

    if (IS_BROWSER) {
      urlDefinitions.push(
        this.getUrlDefinition(
          document.head
            .querySelector('meta[name="design-system-settings"][data-post-icon-base]')
            ?.getAttribute('data-post-icon-base'),
          'relative',
        ),
      );
      urlDefinitions.push(
        this.getUrlDefinition(document.querySelector('base[href]')?.getAttribute('href'), 'both'),
      );
    }

    // in case no definition defines a domain, a relative url is used to load the icon
    const origin = urlDefinitions.find(d => d.definesDomain)?.url?.origin;
    // in case no definition defines a slug either, the cdn url is used as a fallback
    const slug = urlDefinitions.find(d => d.definesSlug)?.url?.pathname;

    if (origin && slug) {
      url = `${origin}${slug}${file}`;
    } else if (!origin && slug) {
      url = `${slug}${file}`;
    } else {
      url = `${CDN_URL}${file}`;
    }

    return url;
  }

  private getUrlDefinition(
    url: string | undefined | null,
    allow: 'both' | 'absolute' | 'relative',
  ): UrlDefinition {
    return {
      url: this.getUrlObject(url),
      definesDomain: allow !== 'relative' ? this.definesDomain(url) : false,
      definesSlug: allow !== 'absolute' ? this.definesSlug(url) : false,
    } as UrlDefinition;
  }

  private getUrlObject(url: string | undefined | null) {
    if (url) {
      url = url?.endsWith('/') ? url : `${url}/`;
      return new URL(url, 'https://url.base');
    } else {
      return null;
    }
  }

  private definesDomain(url: string | undefined | null) {
    return url ? /^https?:\/\//.test(url) : false;
  }

  private definesSlug(url: string | undefined | null) {
    return Boolean(/^\/.+/.test(this.getUrlObject(url)?.pathname));
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
