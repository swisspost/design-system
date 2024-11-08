import { Component, Event, EventEmitter, Host, State, h } from '@stencil/core';

@Component({
  tag: 'post-megadropdown-trigger',
  shadow: true,
  styleUrl: './post-megadropdown-trigger.scss',
})
export class PostMegadropdownTrigger {
  /**
   * Emits after each toggle
   */
  @Event() postToggle: EventEmitter;

  @State() toggled = false;

  private handleClick() {
    this.toggled = !this.toggled;
    this.postToggle.emit();
  }

  render() {
    return (
      <Host slot="post-megadropdown-trigger">
        <button aria-expanded={this.toggled} onClick={() => this.handleClick()}>
          <slot></slot>
        </button>
      </Host>
    );
  }
}
