import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'post-icon',
  styleUrl: 'post-icon.scss',
  shadow: true,
})
export class PostIcon {
  @Prop() name: string;
  @Prop() base?: string;
  @Prop() scale?: string;
  @Prop() rotate?: string;
  @State() path: string;
  @State() svgSource: string = '<svg viewBox="0 0 16 16"></svg>';
  @State() svgOutput: string;

  // css-only attributes
  @Prop() flipH?: string;
  @Prop() flipV?: string;
  @Prop() animation?: string;

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
