import { Component, Event, EventEmitter, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'post-mainnavigation',
  shadow: false,
  styleUrl: './post-mainnavigation.scss',
})
export class PostMainnavigation {
  private header: HTMLPostHeaderElement | null;

  @Element() host: HTMLPostMainnavigationElement;

  /**
   * Gets emitted when a user closes the main navigation on mobile
   */
  @Event() postToggle: EventEmitter;

  /**
   * Retrieves a reference to the closest 'post-header' element when the main navigation is added to the DOM.
   */
  connectedCallback() {
    this.header = this.host.closest('post-header');
  }

  /**
   * Cleans up references and disconnects the MutationObserver when the main navigation is removed from the DOM.
   */
  disconnectedCallback() {
    this.header = null;
  }

  private handleBackButtonClick() {
    if (this.header) this.header.toggleMobileMenu();
  }

  render() {
    return (
      <Host slot="post-mainnavigation">
        <div onClick={() => this.handleBackButtonClick()} class="back-button">
          <slot name="back-button"></slot>
        </div>
        <nav>
          <slot></slot>
        </nav>
      </Host>
    );
  }
}
