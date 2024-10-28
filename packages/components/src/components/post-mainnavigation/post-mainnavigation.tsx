import { Component, Event, EventEmitter, Host, Listen, Method, h } from '@stencil/core';

@Component({
  tag: 'post-mainnavigation',
  shadow: false,
  styleUrl: './post-mainnavigation.scss',
})
export class PostMainnavigation {
  /**
   * Gets emitted when a user closes the main navigation on mobile
   */
  @Event() postMainNavigationClosed: EventEmitter;

  @Listen('postMegadropdownToggled')
  handleMegadropdownToggled(event) {
    // Find next element sibling
    let megalodon;
    let target = event.target;
    while (target !== null) {
      if (target.tagName === 'POST-MEGADROPDOWN') {
        megalodon = target;
        break;
      }
      target = target.nextElementSibling;
    }
    if (megalodon) megalodon.toggle(event.target);
  }

  private handleBackButtonClick() {
    this.postMainNavigationClosed.emit();
  }

  render() {
    return (
      <Host slot="post-mainnavigation">
        <div onClick={() => this.handleBackButtonClick()} class="back-button">
          <slot name="back-button"></slot>
        </div>
        <nav class="main-navigation">
          <slot></slot>
        </nav>
      </Host>
    );
  }
}
