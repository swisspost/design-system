import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkNonEmpty } from '@/utils';

/**
 * @slot default - Slot for the body of the card
 * @slot header - Slot for the card header
 * @slot footer - Slot for the card footer
 */
@Component({
  tag: 'post-card',
  styleUrl: 'post-card.scss',
  shadow: false,
})
export class PostCard {
  @Element() host: HTMLPostCardElement;

  @State() hasHeader: boolean;
  @State() hasFooter: boolean;
  @State() hasOneInteractiveElement: boolean;

  /**
   * Image source
   */
  @Prop() imgSrc?: string;

  /**
   * Variant of the card
   */
  @Prop() variant?: 'card' | 'card-product' | 'card-teaser' = 'card';

  /**
   * Image position
   */
  @Prop() imgPosition?: 'top' | 'bottom' = 'top';

  @Watch('imgSrc')
  validateImage() {
    if (this.variant === 'card-teaser') {
      checkNonEmpty(this, 'imgSrc', 'A card teaser requires an image.');
    }
  }

  /**
   * Class to be added to the card
   */
  private variantClass = 'card';

  private checkIfInteractive() {
    const interactiveElements: NodeListOf<HTMLAnchorElement> =
      this.host.querySelectorAll('a, button');
    this.hasOneInteractiveElement = interactiveElements.length === 1;
    console.log(interactiveElements, interactiveElements.length, this.hasOneInteractiveElement);
  }

  componentWillRender() {
    this.hasHeader = this.host.querySelectorAll('[slot=header]').length > 0;
    this.hasFooter = this.host.querySelectorAll('[slot=footer]').length > 0;

    switch (this.variant) {
      case 'card':
        this.variantClass = 'card';
        break;
      case 'card-product':
        this.variantClass = 'card product-card';
        break;
      case 'card-teaser':
        this.variantClass = 'card teaser-card';
        break;
    }

    if (this.variant === 'card-product') {
      this.hasOneInteractiveElement = false;
    } else {
      this.checkIfInteractive();
    }
  }

  private renderCardContent() {
    return (
      <div class={this.variantClass}>
        {this.imgSrc && this.imgPosition === 'top' && (
          <img class={'card-img-' + this.imgPosition} src={this.imgSrc} alt="" />
        )}
        {this.hasHeader && (
          <div class="card-header">
            <slot name="header" />
          </div>
        )}
        {this.variant === 'card-product' && <slot />}
        {this.variant !== 'card-product' && (
          <div class="card-body">
            <slot />
          </div>
        )}

        {this.hasFooter && (
          <div class="card-footer">
            <slot name="footer" />
          </div>
        )}
        {this.imgSrc && this.imgPosition === 'bottom' && (
          <img class={'card-img-' + this.imgPosition} src={this.imgSrc} alt="" />
        )}
      </div>
    );
  }

  render() {
    return (
      <Host data-version={version}>
        {this.hasOneInteractiveElement && <post-linkarea>{this.renderCardContent()}</post-linkarea>}
        {!this.hasOneInteractiveElement && this.renderCardContent()}
      </Host>
    );
  }
}
