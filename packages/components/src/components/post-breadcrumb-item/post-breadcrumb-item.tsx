import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkUrl } from '@/utils';

/**
 * @slot default - Slot for placing the text inside the breadcrumb item.
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
  @Prop() url?: string | URL;

  @Watch('url')
  validateUrl() {
    checkUrl(this.url, 'The "url" property of the post-breadcrumb-item is invalid');
  }

  connectedCallback() {
    this.validateUrl();
  }

  render() {
    let breadcrumbLink: string | undefined;
    if (this.url) {
      breadcrumbLink = typeof this.url === 'string' ? this.url : this.url.href;
    }

    const BreadcrumbTag = breadcrumbLink ? 'a' : 'span';

    return (
      <Host data-version={version}>
        <BreadcrumbTag class="breadcrumb-item-text" {...(breadcrumbLink ? { href: breadcrumbLink } : {})}>
          <post-icon name="2111" class="breadcrumb-item-icon" />
          <slot></slot>
        </BreadcrumbTag>
      </Host>
    );
  }
}


