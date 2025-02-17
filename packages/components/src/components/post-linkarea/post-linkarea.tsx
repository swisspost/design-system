import { Component, Element, h, Host } from '@stencil/core';
import { version } from '@root/package.json';

const INTERACTIVE_ELEMENTS = ['a'].join(',');
const INTERACTIVE_ELEMENTS_SELECTOR = `:where(${INTERACTIVE_ELEMENTS})`;

type InteractiveElement = HTMLAnchorElement;

@Component({
  tag: 'post-linkarea',
  styleUrl: 'post-linkarea.scss',
})
export class PostLinkarea {
  @Element() host: HTMLPostLinkareaElement;

  private dispatchClick({ ctrlKey, shiftKey, altKey, metaKey }: MouseEvent) {
    const interactiveElement: InteractiveElement =
      this.host.querySelector(`[data-link]${INTERACTIVE_ELEMENTS_SELECTOR}`) ??
      this.host.querySelector(INTERACTIVE_ELEMENTS_SELECTOR);

    if (!interactiveElement) {
      throw new Error(
        `The \`post-linkarea\` component must contain an interactive element. Possible elements are: ${INTERACTIVE_ELEMENTS}.`,
      );
    }

    interactiveElement.dispatchEvent(
      new MouseEvent('click', { ctrlKey, shiftKey, altKey, metaKey }),
    );
  }
  render() {
    return (
      <Host data-version={version} onClick={e => this.dispatchClick(e)} tabindex="0">
        <slot></slot>
      </Host>
    );
  }
}
