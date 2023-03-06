import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import { checkType, checkEmptyOrType, checkEmptyOrOneOf } from '../../utils';

const CDN_URL = 'https://unpkg.com/@swisspost/design-system-icons/public/post-icons';
const ANIMATION_KEYS = [
  'cylon',
  'cylon-vertical',
  'spin',
  'spin-reverse',
  'fade',
  'throb'
];

/**
 * @class PostIcon - representing a stencil component
 */
@Component({
  tag: 'post-icon',
  styleUrl: 'post-icon.scss',
  shadow: true,
})
export class PostIcon {
  private initialPath: string;
  private path: string;
  private svgSource = '<svg viewBox="0 0 16 16"></svg>';

  @State() svgOutput: string;

  /**
   * The name of the animation (`cylon`, `cylon-vertical`, `spin`, `spin-reverse`, `fade`, `throb`).
   */
  @Prop() readonly animation?: string;

  @Watch('animation')
  validateAnimation(newValue = this.animation) {
    if (newValue !== undefined) checkEmptyOrOneOf(newValue, ANIMATION_KEYS, `The post-icon "animation" prop requires one of the following values: ${ANIMATION_KEYS.join(', ')}.`);
  }

  /**
   * The base path, where the icons are located (must be a public url).
   */
  @Prop() readonly base?: string;

  @Watch('base')
  validateBase(newValue = this.base) {
    checkEmptyOrType(newValue, 'string', 'The post-icon "base" prop should be a string.');
  }

  /**
   * When set to `true`, the icon will be flipped horizontally.
   */
  @Prop() readonly flipH?: boolean;

  @Watch('flipH')
  validateFlipH(newValue = this.flipH) {
    checkEmptyOrType(newValue, 'boolean', 'The post-icon "flipH" prop should be a boolean.');
  }

  /**
   * When set to `true`, the icon will be flipped vertically.
   */
  @Prop() readonly flipV?: boolean;

  @Watch('flipV')
  validateFlipV(newValue = this.flipV) {
    checkEmptyOrType(newValue, 'boolean', 'The post-icon "flipV" prop should be a boolean.');
  }

  /**
   * The name/id of the icon (e.g. 1000, 1001, ...).
   */
  @Prop() readonly name: string;

  @Watch('name')
  validateName(newValue = this.name) {
    checkType(newValue, 'string', 'The post-icon "name" prop should be a string.');
  }

  /**
   * The `number` of degree for the css `rotate` transformation.
   */
  @Prop() readonly rotate?: number;

  @Watch('rotate')
  validateRotate(newValue = this.rotate) {
    checkEmptyOrType(newValue, 'number', 'The post-icon "rotate" prop should be a number.');
  }

  /**
   * The `number` for the css `scale` transformation.
   */
  @Prop() readonly scale?: number;

  @Watch('scale')
  validateScale(newValue = this.scale) {
    checkEmptyOrType(newValue, 'number', 'The post-icon "scale" prop should be a number.');
  }

  connectedCallback() {
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

    this.path = this.getPath(basePath);
    this.svgSource = window.localStorage.getItem(`post-icon-${this.name}`) ?? this.svgSource;
  }

  componentWillLoad() {
    this.validateAnimation();
    this.validateBase();
    this.validateFlipH();
    this.validateFlipV();
    this.validateName();
    this.validateRotate();
    this.validateScale();

    this.fetchSVG();
  }

  componentWillRender() {
    const svgStyles = Object.entries({
      scale: this.scale && !isNaN(Number(this.scale)) ? `${this.scale}` : null,
      rotate: this.rotate && !isNaN(Number(this.rotate)) ? `${this.rotate}deg` : null,
    })
      .filter(([_key, value]) => value !== null)
      .map(([key, value]) => `${key}: ${value}`)
      .join(';');

    const helperElement = document.createElement('div');
    helperElement.innerHTML = this.svgSource;

    const svgElement = helperElement.querySelector('svg');
    svgElement.setAttribute('style', svgStyles);

    this.svgOutput = helperElement.innerHTML;
  }

  private fetchSVG() {
    fetch(this.path)
      .then(response => response.text())
      .then(textResponse => {
        const match = textResponse.match(/^<svg\b([\s\S]*)><\/svg>/);

        if (match !== null) {
          this.svgSource = match[0];
          window.localStorage.setItem(`post-icon-${this.name}`, this.svgSource);
        } else {
          this.initialPath = this.path;
          this.path = this.getPath(CDN_URL);

          if (this.initialPath !== this.path) {
            console.warn(
              `Warning in <post-icon/>: The content on the path "${this.path}" seems to be no svg-only content. We'll gonna try to load the icon from the cdn.`,
            );
            this.fetchSVG();
          } else {
            console.error(
              `Error in <post-icon/>: Could not load the svg on the path "${this.initialPath}"!`,
            );
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  private getPath(basePath: string) {
    return new URL(
      [...basePath.split('/'), `${this.name}.svg#icon`].join('/'),
      window.location.origin,
    ).toString();
  }

  render() {
    return (
      <Host>
        <div innerHTML={this.svgOutput} />
      </Host>
    );
  }
}
