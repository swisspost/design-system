import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - Slot for the section
 */
@Component({
  tag: 'post-card-section',
  styleUrl: 'post-card-section.scss',
  shadow: false,
})
export class PostCardSection {
  @Element() host: HTMLPostCardSectionElement;

  @State() hasOneInteractiveElement: boolean;

  /**
   * Palette to use on section
   */
  @Prop() palette?: 'alternate' | 'default' | 'accent' | 'brand' = 'default';

  private checkIfInteractive() {
    const interactiveElements: NodeListOf<HTMLAnchorElement> =
      this.host.querySelectorAll('a, button');
    this.hasOneInteractiveElement = interactiveElements.length === 1;
    console.log(interactiveElements, interactiveElements.length, this.hasOneInteractiveElement);
  }

  componentWillRender() {
    this.checkIfInteractive();
  }

  render() {
    return (
      <Host data-version={version} class={'card-body palette-' + this.palette}>
        {this.hasOneInteractiveElement && (
          <post-linkarea>
            <slot></slot>
          </post-linkarea>
        )}
        {!this.hasOneInteractiveElement && <slot></slot>}
      </Host>
    );
  }
}
