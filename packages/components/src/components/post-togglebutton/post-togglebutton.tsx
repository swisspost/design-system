import { Component, Host, h, Prop } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - Slot to set button to untoggled
 * @slot toggled - Slot for content displayed when the button is in the "on" state.
 * @slot untoggled - Slot for content displayed when the button is in the "off" state.
 */

@Component({
  tag: 'post-togglebutton',
  styleUrl: 'post-togglebutton.scss',
  shadow: true,
})
export class PostTogglebutton {
  /**
   * If `true`, the button is in the "on" state, otherwise it is in the "off" state.
   */
  @Prop({ reflect: true, mutable: true }) toggled: boolean = false;

  private handleClick = () => {
    this.toggled = !this.toggled;
  };

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.toggled = !this.toggled;
    }
  };

  render() {
    return (
      <Host
        slot="post-togglebutton"
        tabindex="0"
        data-version={version}
        role="button"
        aria-pressed={this.toggled.toString()}
        onClick={this.handleClick}
        onKeyDown={this.handleKeydown}
      >
        {this.toggled ? <slot name="toggled"></slot> : <slot name="untoggled"></slot>}
      </Host>
    );
  }
}
