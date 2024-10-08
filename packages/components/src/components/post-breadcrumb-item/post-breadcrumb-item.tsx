import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkEmptyOrUrl } from '@/utils';

/**
 * @slot default - Slot for placing the text inside the breadcrumb link.
 */

@Component({
  tag: 'post-breadcrumb-item',
  styleUrl: 'post-breadcrumb-item.scss',
  shadow: true,
})
export class PostBreadcrumbItem {
  @Element() host: HTMLPostBreadcrumbItemElement;

  /**
   * The URL to which the breadcrumb item will link.
   */
  @Prop() readonly url!: string;

  @Watch('url')
  validateUrl() {
    checkEmptyOrUrl(this.url, 'The "url" property is invalid');
  }

  connectedCallback() {
    this.validateUrl();
  }

  render() {
    return (
      <Host data-version={version}>
        <a href={this.url}>
          <post-icon name="2111" class="breadcrumb-item-icon" />
          <slot></slot>
        </a>
      </Host>
    );
  }
}
