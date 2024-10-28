import { Component, Event, EventEmitter, Host, State, h } from '@stencil/core';

@Component({
  tag: 'post-megadropdown-toggle',
  shadow: true,
  styleUrl: './post-megadropdown-toggle.scss',
})
export class PostMegadropdownToggle {
  @Event() postMegadropdownToggled: EventEmitter;

  @State() toggled = false;

  private handleClick() {
    this.toggled = !this.toggled;
    this.postMegadropdownToggled.emit();
  }

  render() {
    return (
      <Host slot="post-megadropdown-toggle">
        <button onClick={() => this.handleClick()}>
          <slot></slot>
        </button>
      </Host>
    );
  }
}
