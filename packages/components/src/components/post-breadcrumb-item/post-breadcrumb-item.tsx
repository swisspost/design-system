import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkUrl } from '@/utils';

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
   * The optional URL to which the breadcrumb item will link.
   */
  @Prop() readonly url?: string;

  @Watch('url')
  validateUrl() {
    if (this.url) {
      checkUrl(this.url, 'The "url" property is invalid');
    }
  }

  connectedCallback() {
    this.validateUrl();
  }

  render() {
    const isLink = this.url && !this.url.startsWith('#') && /^(\/|https?:\/\/)/.test(this.url);
    
    return (
      <Host data-version={version}>
        {isLink ? (
          <a href={this.url}>
            <post-icon name="2111" class="breadcrumb-item-icon" />
            <slot></slot>
          </a>
        ) : (
          <span class="breadcrumb-item-text">
            <post-icon name="2111" class="breadcrumb-item-icon" />
            <slot></slot>
          </span>
        )}
      </Host>
    );
  }
}
