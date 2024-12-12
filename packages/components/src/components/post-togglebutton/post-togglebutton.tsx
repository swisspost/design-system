import { Component, Host, h, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkType } from '@/utils';

/**
 * @slot default - Slot for the content of the button.
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
  @Prop({ mutable: true }) toggled: boolean = false;

  @Watch('toggled')
  validateToggled(value = this.toggled) {
    checkType(
      value,
      'boolean',
      'The "toggled" property of the post-togglebutton must be a boolean.',
    );
  }

  componentWillLoad() {
    this.validateToggled();
  }

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
        <slot />
      </Host>
    );
  }
}
