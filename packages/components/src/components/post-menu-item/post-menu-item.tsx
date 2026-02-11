import { Component, Element } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-menu-item',
  styleUrl: 'post-menu-item.scss',
})
export class PostMenuItem {
  @Element() host: HTMLPostMenuItemElement;

  connectedCallback() {
    this.host.setAttribute('data-version', version);
  }
}
