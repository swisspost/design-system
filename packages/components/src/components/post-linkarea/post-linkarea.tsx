import { Component, Element, h, Host } from '@stencil/core';
import { version } from '@root/package.json';

const INTERACTIVE_ELEMENTS = ['a'].join(',');
const INTERACTIVE_ELEMENTS_SELECTOR = `:where(${INTERACTIVE_ELEMENTS})`;

@Component({
  tag: 'post-linkarea',
  styleUrl: 'post-linkarea.scss',
  shadow: true,
})
export class PostLinkarea {
  @Element() host: HTMLPostLinkareaElement;

  private dispatchClick({ ctrlKey, shiftKey, altKey, metaKey }: MouseEvent) {
    this.host
      .querySelector(INTERACTIVE_ELEMENTS_SELECTOR)
      .dispatchEvent(new MouseEvent('click', { ctrlKey, shiftKey, altKey, metaKey }));
  }

  componentDidLoad() {
    const interactiveElements = this.host.querySelectorAll(INTERACTIVE_ELEMENTS_SELECTOR);
    console.log('interactive elements', interactiveElements);
    if (!interactiveElements.length) {
      throw new Error(
        `The \`post-linkarea\` component must contain an interactive element. Possible elements are: ${INTERACTIVE_ELEMENTS}.`,
      );
    }

    if (interactiveElements.length > 1) {
      throw new Error(
        `The \`post-linkarea\` currently contains ${interactiveElements.length} interactive elements when it should contain only one.`,
      );
    }
  }

  render() {
    return (
      <Host data-version={version} onClick={(e: MouseEvent) => this.dispatchClick(e)} tabindex="0">
        <slot></slot>
      </Host>
    );
  }
}
