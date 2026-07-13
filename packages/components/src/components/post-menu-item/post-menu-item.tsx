import { version } from '@root/package.json';
import { Component, Element } from '@stencil/core';

@Component({
  tag: 'post-menu-item',
  styleUrl: 'post-menu-item.scss',
})
export class PostMenuItem {
  @Element() host: HTMLPostMenuItemElement;

  connectedCallback() {
    this.host.dataset.version = version;
  }
}
