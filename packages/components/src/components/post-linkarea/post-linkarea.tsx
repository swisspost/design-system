import { Component, Element, h, Host, State } from '@stencil/core';
import { version } from '@root/package.json';

const INTERACTIVE_ELEMENTS = ['a', 'input[type="checkbox"]', 'input[type="radio"]'].join(',');
const INTERACTIVE_ELEMENTS_SELECTOR = `:where(${INTERACTIVE_ELEMENTS})`;

@Component({
  tag: 'post-linkarea',
  styleUrl: 'post-linkarea.scss',
  shadow: true,
})
export class PostLinkarea {
  private mutationObserver = new MutationObserver(this.checkInteractiveElements.bind(this));

  @Element() host: HTMLPostLinkareaElement;

  @State() interactiveElements: NodeListOf<HTMLAnchorElement>;

  private dispatchClick({ target, ctrlKey, shiftKey, altKey, metaKey }: MouseEvent) {
    if (target !== this.interactiveElements[0]) {
      this.interactiveElements[0]?.dispatchEvent(
        new MouseEvent('click', { ctrlKey, shiftKey, altKey, metaKey }),
      );
    }
  }

  private checkInteractiveElements() {
    this.interactiveElements = this.host.querySelectorAll(INTERACTIVE_ELEMENTS_SELECTOR);

    if (this.interactiveElements.length !== 1) {
      console.error(
        `The \`post-linkarea\` currently contains ${this.interactiveElements.length} interactive elements when it should contain exactly one.`,
      );
    } else {
      this.interactiveElements[0].style.setProperty('outline', 'unset', 'important');
    }
  }

  connectedCallback() {
    this.mutationObserver.observe(this.host, { childList: true });
  }

  componentWillLoad() {
    this.checkInteractiveElements();
  }

  disconnectedCallback() {
    this.mutationObserver.disconnect();
  }

  render() {
    return (
      <Host data-version={version} onClick={(e: MouseEvent) => this.dispatchClick(e)}>
        <slot></slot>
      </Host>
    );
  }
}
