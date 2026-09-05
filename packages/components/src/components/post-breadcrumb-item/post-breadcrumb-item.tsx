import { OneOf, Required, Type, Url } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { Variant, VARIANTS } from './variants';

/**
 * @slot default - The content displayed inside the breadcrumb item. Can contain text or an <a> element, so consumers can slot their own routing-aware link (e.g. Next.js Link) instead of relying on the `url` prop.
 */
@Component({
  tag: 'post-breadcrumb-item',
  styleUrl: 'post-breadcrumb-item.scss',
  shadow: true,
})
export class PostBreadcrumbItem {
  @Element() host: HTMLPostBreadcrumbItemElement;

  // Whether the consumer slotted their own <a>. When true, the component renders only the
  // <slot>, leaving the slotted anchor untouched so the host app's router can handle clicks.
  @State() hasSlottedAnchor = false;

  /**
   * The destination URL for the breadcrumb item. Ignored if an `<a>` element is slotted in. If both are omitted, the item is rendered as non-interactive text.
   */
  @Prop({ reflect: true })
  @Url()
  url?: string | URL;

  /**
   * An accessible label screen readers will use this instead of the breadcrumb item content.
   */
  @Prop({ reflect: true })
  @Type('string')
  label?: string;

  /**
   * An accessible description for additional context, read after the content or `label`.
   */
  @Prop({ reflect: true })
  @Type('string')
  description?: string;

  /**
   * Controls how the item is rendered, either as a standard list item or within an overflow menu.
   */
  @Prop({ reflect: true })
  @OneOf(VARIANTS)
  variant: Variant = 'listitem';

  /**
   * Indicates that the item represents the current page, applying appropriate styling.
   */
  @Prop({ reflect: true })
  @Required()
  @Type('boolean')
  selected = false;

  componentWillLoad() {
    this.checkSlottedAnchor();
  }

  private checkSlottedAnchor() {
    this.hasSlottedAnchor = this.host.querySelector('a') !== null;
  }

  render() {
    const href = this.url instanceof URL ? this.url.href : this.url;
    const content = this.hasSlottedAnchor ? (
      <slot onSlotchange={() => this.checkSlottedAnchor()}></slot>
    ) : href ? (
      <a
        href={href}
        aria-current={this.selected ? 'page' : undefined}
        aria-label={this.label}
        aria-description={this.description}
      >
        <slot onSlotchange={() => this.checkSlottedAnchor()}></slot>
      </a>
    ) : (
      <span>
        <slot onSlotchange={() => this.checkSlottedAnchor()}></slot>
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
