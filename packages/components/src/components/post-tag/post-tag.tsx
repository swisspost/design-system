import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { version } from '../../../package.json';

/**
 * @Slot default slot used for the Text contained by the post-tag
 */
@Component({
  tag: 'post-tag',
  styleUrl: 'post-tag.scss',
  shadow: true,
})
export class PostTag {
  @Element() host: HTMLPostTagElement;

  @State() classes: string;

  /**
   * Sets the background color of the tag as well as the matching text color.
   * Expected values: ['gray', 'white', info, 'success', 'error', 'warning', 'yellow']
   * default vaue: 'gray'
   */
  @Prop() readonly color?: string = 'gray';

  /**
   * Sets the size (height) of the tag. Also affects the size of the icon.
   * Expected values:
   * post-tag -> large (default)
   * post-tag-sm -> small
   *
   */
  @Prop() readonly size?: string = 'post-tag';

  /**
   * Defines which icon from the swisspost icon library is used. Excpects a number.
   * If there is no value asigned to it no icon will be rendered.
   * Check the desing-system.post documentation to see all available icons.
   *
   * PS: Values 0 and null are ignored
   */
  @Prop() readonly icon?: number;

  componentWillRender() {
    this.classes = `${this.size} bg-${this.color}`;
  }

  render() {
    const icon = `${this.icon}`;

    return (
      <Host data-version={version}>
        <div class={this.classes}>
          {!!this.icon && <post-icon name={icon} class="post-tag-icon"></post-icon>}
          <div>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
