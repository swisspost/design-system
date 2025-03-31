import { Component, Element, h, Host, State } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-mainnavigation-toplevel-item',
  styleUrl: 'post-mainnavigation-toplevel-item.scss',
  shadow: true,
})
export class PostMainnavigationToplevelItem {
  private readonly slotObserver: MutationObserver;

  @Element() host: HTMLPostMainnavigationToplevelItemElement;

  /**
   * Slotted html which need to be mirrored in the .active element to avoid layout shifts.
   */
  @State() slottedHTML: string;

  constructor() {
    this.setSlottedHTML = this.setSlottedHTML.bind(this);
    this.slotObserver = new MutationObserver(this.setSlottedHTML);
  }

  private setSlottedHTML() {
    this.slottedHTML = this.host.innerHTML;
  }

  connectedCallback() {
    this.setSlottedHTML();
  }

  componentDidLoad() {
    this.slotObserver.observe(this.host, { characterData: true, childList: true, subtree: true });
  }

  disconnectedCallback() {
    this.slotObserver.disconnect();
  }

  render() {
    return (
      <Host data-version={version}>
        <span class="active" aria-hidden="true" innerHTML={this.slottedHTML}></span>
        <span class="inactive">
          <slot></slot>
        </span>
      </Host>
    );
  }
}
