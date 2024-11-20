import { Component, Element, h, Host } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-linkarea',
  styleUrl: 'post-linkarea.scss',
  shadow: true,
})
export class PostLinkarea {
  @Element() hostElement: HTMLPostLinkareaElement;

  private handleClick = () => {
    const customSlottedLink: HTMLAnchorElement = this.hostElement.querySelector('a[data-link]');

    const linkElement: HTMLAnchorElement = customSlottedLink
      ? customSlottedLink
      : this.hostElement.querySelector('a');

    if (linkElement.href) {
      window.location.href = linkElement.href;
    } else {
      console.error('<post-linkarea> : Your element must contain a child with a `href` property.');
    }
  };

  render() {
    return (
      <Host data-version={version} onClick={this.handleClick} tabindex="0">
        <slot></slot>
      </Host>
    );
  }
}
