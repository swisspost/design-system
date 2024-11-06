import { Component, Host, h, Prop } from '@stencil/core';
import { version } from '@root/package.json';

/**
 * @slot default - Slot to set button to untoggled
 * @slot toggled - Slot to set button to untoggled
 * @slot untoggled - Slot to set button to untoggled
 */

@Component({
  tag: 'post-togglebutton',
  styleUrl: 'post-togglebutton.scss',
  shadow: true,
})
export class PostTogglebutton {
  /**
   * The component state
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
