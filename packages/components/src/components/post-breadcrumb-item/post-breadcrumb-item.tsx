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

  @Prop() fullUrl?: string | URL;

  private validUrl?: string;

  @Watch('url')
  validateUrl() {
    try {
      this.validUrl = this.constructUrl(this.url);
    } catch (error) {
      this.validUrl = undefined;
    }
  }

  // Helper to construct a valid URL string or return undefined
  private constructUrl(value: unknown): string | undefined {
    const hasBaseURL = /^https?:\/\//.test(String(this.url));
    console.log(value);
    if (typeof value === 'string') {
      this.fullUrl = hasBaseURL ? value : `${window.location.origin}${value}`;
      checkEmptyOrUrl(this, 'fullUrl');
      return this.fullUrl;
    }
    return undefined;
  }

  connectedCallback() {
    this.validateUrl();
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      const linkElement = this.host.shadowRoot?.querySelector('a');
      if (linkElement) {
        event.preventDefault();
        (linkElement as HTMLElement).click();
      }
    }
  }

  render() {
    const BreadcrumbTag = this.validUrl ? 'a' : 'span';

    return (
      <Host data-version={version}>
        <post-icon name="2111" class="breadcrumb-item-icon" />
        <BreadcrumbTag
          class="breadcrumb-item"
          {...(this.validUrl ? { href: this.validUrl } : {})}
          onKeyDown={event => this.handleKeyDown(event)}
        >
          <slot></slot>
        </BreadcrumbTag>
      </Host>
    );
  }
}
