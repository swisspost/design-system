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
   * The name of this prop is `bg-color` in HTML, in TSX you can use `bgColor`.
   *
   * Expected values: ['gray', 'white', info, 'success', 'error', 'warning', 'yellow']
   *
   * default vaue: 'gray'
   */
  @Prop() readonly bgColor?: string = 'gray';

  /**
   * Sets the size (height) of the tag. Also affects the size of the icon.
   * Expected values:
   *
   * no-value -> large (default)
   *
   * tag-sm -> small
   *
   */
  @Prop() readonly size?: string = '';

  /**
   * Defines which icon from the Swiss Post Icon Library is used. Excpects a number.
   * If there is no value asigned to it no icon will be rendered.
   * Check the desing-system.post documentation to see all available icons.
   *
   * Example `1001` -> Letter
   *
   * PS: Values 0 and null are ignored
   */
  @Prop() readonly icon?: number;

  componentWillRender() {
    this.classes = `tag ${this.size} bg-${this.bgColor}`;
  }

  render() {
    const icon = `${this.icon}`;

    return (
      <Host data-version={version}>
        <div class={this.classes}>
          {!!this.icon && <post-icon name={icon} class="tag-icon"></post-icon>}
          <div class="tag-content">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
