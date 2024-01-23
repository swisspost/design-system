import { Component, Element, h, Host, Prop } from '@stencil/core';
import { version } from '../../../package.json';

/**
 * @class PostTag - representing a stencil component
 */
@Component({
  tag: 'post-tag',
  styleUrl: 'post-tag.scss',
  shadow: true,
})
export class PostTag {
  @Element() host: HTMLPostTagElement;

  @Prop() readonly color?: string = 'color';
  @Prop() readonly size?: string = 'size';
  @Prop() readonly showIcon?: boolean = true;
  @Prop() readonly icon: number;

  render() {
    const icon = `${this.icon}`;

    return (
      <Host data-version={version}>
        <div class="tag">
          {this.showIcon ? <post-icon name={icon}></post-icon> : ''}
          <div class="tag-content">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
