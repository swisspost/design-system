import { Component, Element, Host, h, Prop, State, Watch } from '@stencil/core';
import { checkNonEmpty, checkType, checkEmptyOrType, checkEmptyOrOneOf } from '../../utils';
import { version } from '../../../package.json';

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
  private path: string;
  private loadedPath: string;
  private svgSource = '<svg viewBox="0 0 16 16"></svg>';
  private svgElement: SVGElement;

  @Element() host: HTMLPostIconElement;

  @State() pathForceCDN = false;
  @State() svgStyles: string;
  @State() svgOutput: string;

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

  componentWillLoad() {
    this.validateBase();
    this.validateName();
    this.validateFlipH();
    this.validateFlipV();
    this.validateScale();
    this.validateRotate();
    this.validateAnimation();
  }

  componentWillRender() {
    this.createIconFromStorage();

    // create path dependant on the props
    this.setPath();

    // fetch icon if the prop "name" is defined and
    // the path has not allready been loaded
    if (this.name && this.path !== this.loadedPath) {
      this.loadedPath = this.path;

      this.fetchIcon()
        .then(successfullyLoaded => {
          // create icon only if an svg has been loaded successfully
          if (successfullyLoaded) this.createIcon();
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  private setPath() {
    // Construct icon path from different possible sources
    let basePath: string;
    const metaBase = document.head.querySelector(
      'meta[name="design-system-settings"][data-post-icon-base]',
    );

    if (this.base) {
      basePath = this.base;
    } else if (metaBase) {
      basePath = metaBase.getAttribute('data-post-icon-base');
    } else {
      basePath = CDN_URL;
    }

    // use "basePath" only if "pathForceCDN" state is "false"
    this.path = this.getPath(this.pathForceCDN ? CDN_URL : basePath);
    // reset "pathForceCDN" after every try
    this.pathForceCDN = false;
  }

  private getPath(basePath: string) {
    return new URL(
      [...basePath.split('/'), `${this.name}.svg#icon`].join('/'),
      window.location.origin,
    ).toString();
  }

  private fetchIcon() {
    return new Promise((resolve, reject) => {
      fetch(this.path)
        .then(response => response.text())
        .then(textResponse => {
          // match "svg" out of "textResponse"
          const match = textResponse.match(/^<svg\b([\s\S]*)><\/svg>/);

          if (match !== null) {
            // set "svgSource" and return "successfullyLoaded" with true
            this.svgSource = match[0];
            window.localStorage.setItem(`post-icon-${this.name}`, this.svgSource);
            resolve(true);
          } else if (this.path !== this.getPath(CDN_URL)) {
            // if used "path" is not CDN path, and fetch has loaded something else than a "svg", try to reload it from the CDN
            console.warn(
              `Warning in <post-icon/>: The path "${this.path}" seems to be no svg-only content. We'll gonna try to load the icon from the cdn.`,
            );
            // trigger a component update, which will result in a refetch of the icon with the "CDN_URL"
            this.pathForceCDN = true;
            // return "successfullyLoaded" with false
            resolve(false);
          }
        })
        .catch(reject);
    });
  }

  private createIconFromStorage() {
    const storedIcon = window.localStorage.getItem(`post-icon-${this.name}`);

    if (storedIcon) {
      this.svgSource = storedIcon ?? this.svgSource;
      this.createIcon();
    }
  }

  private createIcon() {
    // create svg element from svgSource string
    const domParser = new DOMParser();
    this.svgElement = domParser.parseFromString(this.svgSource, 'text/html').querySelector('svg');

    // create inline styles for some properties
    const svgStyles = Object.entries({
      scale: this.scale && !isNaN(Number(this.scale)) ? `${this.scale}` : null,
      rotate: this.rotate && !isNaN(Number(this.rotate)) ? `${this.rotate}deg` : null,
    })
      .filter(([_key, value]) => value !== null)
      .map(([key, value]) => `${key}: ${value}`)
      .join(';');

    this.svgElement.setAttribute('style', svgStyles);
    this.host.shadowRoot.innerHTML = this.svgElement.outerHTML;
  }

  render() {
    return <Host data-version={version} />;
  }
}
