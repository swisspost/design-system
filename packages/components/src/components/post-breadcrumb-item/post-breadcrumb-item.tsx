import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkEmptyOrUrl } from '@/utils';

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

  private validUrl?: string;

  @Watch('url')
  validateUrl() {
    try {
      this.validUrl = this.constructUrl(this.url);
    } catch (error) {
      console.error(error);
      this.validUrl = undefined;
    }
  }

  // Helper to construct a valid URL string or return undefined
  private constructUrl(value: unknown): string | undefined {
    const hasBaseURL = /^https?:\/\//.test(String(this.url));
    if (typeof value === 'string') {
      const urlString = hasBaseURL
        ? value
        : `${window.location.origin}${value}`;
      checkEmptyOrUrl(urlString, 'The "url" property of the post-breadcrumb-item is invalid');
      return urlString;
    } return undefined;
  }

  connectedCallback() {
    this.validateUrl();
  }

  render() {
    const BreadcrumbTag = this.validUrl ? 'a' : 'span';

    return (
      <Host data-version={version}>
        <BreadcrumbTag class="breadcrumb-item" {...(this.validUrl ? { href: this.validUrl } : {})}>
          <post-icon name="2111" class="breadcrumb-item-icon" />
          <slot></slot>
        </BreadcrumbTag>
      </Host>
    );
  }
}