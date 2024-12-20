import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';
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
  @Element() host: HTMLPostTogglebuttonElement;

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

    // add event listener to not override listener that might be set on the host
    this.host.addEventListener('click', () => this.handleClick());
    this.host.addEventListener('keydown', (e: KeyboardEvent) => this.handleKeydown(e));
  }

  private handleClick = () => {
    this.toggled = !this.toggled;
  };

  private handleKeydown = (event: KeyboardEvent) => {
    // perform a click when enter or spaced are pressed to mimic the button behavior
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // prevents the page from scrolling when space is pressed
      this.host.click();
    }
  };

  render() {
    return (
      <Host
        data-version={version}
        role="button"
        tabindex="0"
        aria-pressed={this.toggled.toString()}
      >
        <slot />
      </Host>
    );
  }
}
