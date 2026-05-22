import { checkEmptyOrOneOf, checkEmptyOrUrl, checkRequiredAndType } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { Variant, VARIANTS } from './variants';

/**
 * @slot default - The content displayed inside the breadcrumb item.
 */
@Component({
  tag: 'post-breadcrumb-item',
  styleUrl: 'post-breadcrumb-item.scss',
  shadow: true,
})
export class PostBreadcrumbItem {
  @Element() host: HTMLPostBreadcrumbItemElement;

  /**
   * The destination URL for the breadcrumb item. If omitted, the item is rendered as non-interactive text.
   */
  @Prop({ reflect: true }) url?: string | URL;

  /**
   * An accessible label screen readers will use this instead of the breadcrumb item content.
   */
  @Prop({ reflect: true }) label?: string;

  /**
   * An accessible description for additional context, read after the content or `label`.
   */
  @Prop({ reflect: true }) description?: string;

  @Watch('url')
  validateURL() {
    checkEmptyOrUrl(this, 'url');
  }

  /**
   * Controls how the item is rendered, either as a standard list item or within an overflow menu.
   */
  @Prop({ reflect: true }) variant: Variant = 'listitem';

  @Watch('variant')
  validateVariant() {
    checkEmptyOrOneOf(this, 'variant', VARIANTS);
  }

  /**
   * Indicates that the item represents the current page, applying appropriate styling.
   */
  @Prop({ reflect: true }) selected = false;

  @Watch('selected')
  validateSelected() {
    checkRequiredAndType(this, 'selected', 'boolean');
  }

  render() {
    const href = this.url instanceof URL ? this.url.href : this.url;
    const content = href ? (
      <a
        href={href}
        aria-current={this.selected ? 'page' : undefined}
        aria-label={this.label}
        aria-description={this.description}
      >
        <slot></slot>
      </a>
    ) : (
      <span>
        <slot></slot>
      </span>
    );

    return this.variant === 'listitem' || this.selected ? (
      <Host data-version={version} role="listitem" slot={this.selected ? 'selected' : undefined}>
        {content}
      </Host>
    ) : (
      <Host data-version={version}>
        <post-menu-item>{content}</post-menu-item>
      </Host>
    );
  }
}
