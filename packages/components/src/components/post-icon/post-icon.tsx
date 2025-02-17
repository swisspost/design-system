import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import { checkNonEmpty, checkType, checkEmptyOrType, checkEmptyOrOneOf } from '@/utils';
import { version } from '@root/package.json';

type UrlDefinition = {
  url: URL | null;
  definesDomain: boolean;
  definesSlug: boolean;
};

const CDN_URL = 'https://unpkg.com/@swisspost/design-system-icons/public/post-icons';
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
  private readonly isSSR: boolean = typeof window === 'undefined';

  @Element() host: HTMLPostIconElement;

  /**
   * The name of the animation.
   */
  @Prop() readonly animation?: Animation | null = null;

  @Watch('animation')
  validateAnimation(newValue = this.animation) {
    if (newValue !== undefined)
      checkEmptyOrOneOf(
        newValue,
        ANIMATION_KEYS,
        `The post-icon "animation" prop requires one of the following values: ${ANIMATION_KEYS.join(
          ', ',
        )}.`,
      );
  }

  /**
   * The base path, where the icons are located (must be a public url).<br/>Leave this field empty to use the default cdn url.
   */
  @Prop() readonly base?: string | null = null;

  @Watch('base')
  validateBase(newValue = this.base) {
    checkEmptyOrType(newValue, 'string', 'The post-icon "base" prop should be a string.');
  }

  /**
   * When set to `true`, the icon will be flipped horizontally.
   */
  @Prop() readonly flipH?: boolean = false;

  @Watch('flipH')
  validateFlipH(newValue = this.flipH) {
    checkEmptyOrType(newValue, 'boolean', 'The post-icon "flipH" prop should be a boolean.');
  }

  /**
   * When set to `true`, the icon will be flipped vertically.
   */
  @Prop() readonly flipV?: boolean = false;

  @Watch('flipV')
  validateFlipV(newValue = this.flipV) {
    checkEmptyOrType(newValue, 'boolean', 'The post-icon "flipV" prop should be a boolean.');
  }

  /**
   * The name/id of the icon (e.g. 1000, 1001, ...).
   */
  @Prop() readonly name!: string;

  @Watch('name')
  validateName(newValue = this.name) {
    checkNonEmpty(newValue, 'The post-icon "name" prop is required!.');
    checkType(newValue, 'string', 'The post-icon "name" prop should be a string.');
  }

  /**
   * The number of degree for the css rotate transformation.
   */
  @Prop() readonly rotate?: number | null = null;

  @Watch('rotate')
  validateRotate(newValue = this.rotate) {
    checkEmptyOrType(newValue, 'number', 'The post-icon "rotate" prop should be a number.');
  }

  /**
   * The number for the css scale transformation.
   */
  @Prop() readonly scale?: number | null = null;

  @Watch('scale')
  validateScale(newValue = this.scale) {
    checkEmptyOrType(newValue, 'number', 'The post-icon "scale" prop should be a number.');
  }

  // Construct the icon url from different possible sources
  private getUrl() {
    const file = `${this.name}.svg`;

    if (this.isSSR) {
      return `${CDN_URL}/${file}`;
    }

    // the first definition object which defines a domain, will be used to set the domain of the file url
    // the first definition object which defines a slug, will be used to set the slug of the file url
    const urlDefinitions = [
      getUrlDefinition(this.base, 'both'),
      getUrlDefinition(
        document.head
          .querySelector('meta[name="design-system-settings"][data-post-icon-base]')
          ?.getAttribute('data-post-icon-base'),
        'relative',
      ),
      getUrlDefinition(document.querySelector('base[href]')?.getAttribute('href'), 'both'),
    ];

    // in case no other definition defines a domain, the current origin is used as a fallback
    const origin = urlDefinitions.find(d => d.definesDomain)?.url?.origin ?? window.location.origin;
    // in case no other definition defines a slug, the cdn url is used as a fallback
    const slug = urlDefinitions.find(d => d.definesSlug)?.url?.pathname;

    let url: string;

    if (slug) {
      url = `${origin}${slug}/${file}`;
    } else {
      url = `${CDN_URL}/${file}`;
    }

    return url;

    function getUrlDefinition(
      url: string | undefined | null,
      allow: 'both' | 'absolute' | 'relative',
    ): UrlDefinition {
      return {
        url: getUrlObject(url),
        definesDomain: allow !== 'relative' ? definesDomain(url) : false,
        definesSlug: allow !== 'absolute' ? definesSlug(url) : false,
      } as UrlDefinition;

      function getUrlObject(url: string | undefined | null) {
        if (url) {
          return definesDomain(url) ? new URL(url) : new URL(url, window.location.origin);
        } else {
          return null;
        }
      }

      function definesDomain(url: string | undefined | null) {
        return url ? /^https?:\/\//.test(url) : false;
      }

      function definesSlug(url: string | undefined | null) {
        const urlObject = getUrlObject(url);
        return Boolean(/^\/.+/.test(urlObject?.pathname));
      }
    }
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
