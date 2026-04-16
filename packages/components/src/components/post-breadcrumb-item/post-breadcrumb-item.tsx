import { Component, Element, h, Host, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkEmptyOrOneOf, checkEmptyOrUrl, checkRequiredAndType } from '@/utils';
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
   * The link destination for the breadcrumb item. If not provided, the item is rendered without a link.
   */
  @Prop() url?: string | URL;

  @Watch('url')
  validateURL() {
    checkEmptyOrUrl(this, 'url');
  }

  /**
   * Defines whether the component renders as a list item or a menu item.
   */
  @Prop({ reflect: true }) variant: Variant = 'listitem';

  @Watch('variant')
  validateVariant() {
    checkEmptyOrOneOf(this, 'variant', VARIANTS);
  }

  /**
   * Defines whether the component renders as a list item or a menu item.
   */
  @Prop({ reflect: true }) selected = false;

  @Watch('selected')
  validateSelected() {
    checkRequiredAndType(this, 'selected', 'boolean');
  }

  render() {
    const href = this.url instanceof URL ? this.url.href : this.url;
    const content = href ? (
      <a href={href}>
        <slot></slot>
      </a>
    ) : (
      <slot></slot>
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
