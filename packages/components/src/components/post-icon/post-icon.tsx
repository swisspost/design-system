import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'post-icon',
  styleUrl: 'post-icon.scss',
  shadow: true,
})
export class PostIcon {
  @Prop() name: string;
  @Prop() base?: string;
  @Prop() rotate?: string;
  @State() path: string;

  componentWillRender () {
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
      basePath = `https://unpkg.com/@swisspost/design-system-icons/public/svg`;
    }

    this.path = new URL(
      [...basePath.split('/'), `${this.name}.svg#icon`].join('/'),
      window.location.origin,
    ).toString();
  }

  render() {
    const transforms = {
      rotate: this.rotate && !isNaN(Number(this.rotate)) ? `${this.rotate}deg` : null,
    };

    return (
      <Host>
        <svg viewBox="0 0 32 32" style={transforms}>
          <use href={this.path} />
        </svg>
      </Host>
    );
  }
}
