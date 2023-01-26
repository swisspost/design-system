import { Component, Host, h, Prop, State } from '@stencil/core';

/**
 * @class PostIcon - representing a stencil component
 * 
 * @param {string} name - The name/id of the icon (e.g. 1000, 1001, ...).
 * @param {string} base - The base path, where the icons are located (must be a public url).
 * @param {boolean} flipH - When set to `true`, the icon will be flipped horizontally.
 * @param {boolean} flipV - When set to `true`, the icon will be flipped vertically.
 * @param {number} scale - The `number` for the css `scale` transformation.
 * @param {number} rotate - The `number` of degree for the css `rotate` transformation.
 * @param {boolean} animation - The name of the animation (`cylon`, `cylon-vertical`, `spin`, `spin-reverse`, `fade`, `throb`).
 * 
 * @exports {class} PostIcon - Which will be processed to a custom web-component on build.
 * 
 * @see: https://jsdoc.app/ and https://en.wikipedia.org/wiki/JSDoc
 */
@Component({
  tag: 'post-icon',
  styleUrl: 'post-icon.scss',
  shadow: true,
})
export class PostIcon {
  @Prop() name: string;
  @Prop() base?: string;
  @Prop() flipH?: boolean;
  @Prop() flipV?: boolean;
  @Prop() scale?: number;
  @Prop() rotate?: number;
  @Prop() animation?: string;
  @State() path: string;
  @State() svgSource: string = '<svg viewBox="0 0 16 16"></svg>';
  @State() svgOutput: string;

  connectedCallback () {
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
      basePath = 'https://unpkg.com/@swisspost/design-system-icons/public/post-icons';
    }
  
    this.path = new URL(
      [...basePath.split('/'), `${this.name}.svg#icon`].join('/'),
      window.location.origin,
    ).toString();

    this.svgSource = window.localStorage.getItem(`post-icon-${this.name}`) ?? this.svgSource;
  }

  componentWillLoad () {
    fetch(this.path)
      .then(response => response.text())
      .then(svgSource => {
        this.svgSource = svgSource;
        window.localStorage.setItem(`post-icon-${this.name}`, svgSource);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillRender () {
    const svgStyles = Object
      .entries({
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

  render() {
    return (
      <Host>
        <div innerHTML={ this.svgOutput }/>
      </Host>
    );
  }
}
