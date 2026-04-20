import { Component, Element, h, Host, Prop, Watch, State } from '@stencil/core';
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
  @Prop({ reflect: true }) url?: string | URL;

  /**
   * ARIA label, screen readers will use this instead of the breadcrumb item content.
   */
  @Prop({ reflect: true }) label?: string;

  /**
   * ARIA description for additional context, read after the breadcrumb item content or `label`.
   */
  @Prop({ reflect: true }) description?: string;

  private validUrl?: string;

  /**
   * The full path URL to validate.
   */
  @State() fullUrl: string | undefined;

  @Watch('url')
  validateUrl() {
    try {
      this.validUrl = this.constructUrl(this.url);
    } catch {
      this.validUrl = undefined;
    }
  }

  // Helper to construct a valid URL string or return undefined
  private constructUrl(value: unknown): string | undefined {
    const hasBaseURL = /^https?:\/\//.test(String(this.url));
    if (typeof value === 'string') {
      this.fullUrl = hasBaseURL ? value : `${globalThis.location.origin}${value}`;
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
    return (
      <Host data-version={version}>
        <post-icon name="chevronright" class="breadcrumb-item-icon" />
        {this.validUrl ? (
          <a
            class="breadcrumb-item"
            href={this.validUrl}
            onKeyDown={event => this.handleKeyDown(event)}
            aria-label={this.label}
            aria-description={this.description}
          >
            <slot></slot>
          </a>
        ) : (
          <span class="breadcrumb-item">
            <slot></slot>
          </span>
        )}
      </Host>
    );
  }
}
