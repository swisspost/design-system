import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { version } from '../../../package.json';

@Component({
  tag: 'post-tag',
  styleUrl: 'post-tag.scss',
  shadow: true,
})
export class PostTag {
  @Element() host: HTMLPostTagElement;

  @State() classes: string;

  @Prop() readonly color?: string = 'gray';
  @Prop() readonly size?: string = 'post-tag';
  @Prop() readonly showIcon?: boolean = true;
  @Prop() readonly icon?: number = 1001;

  componentWillRender() {
    this.classes = `${this.size} bg-${this.color}`;
  }

  render() {
    const icon = `${this.icon}`;

    return (
      <Host data-version={version}>
        <div class={this.classes}>
          {this.showIcon ? <post-icon name={icon} class="post-tag-icon"></post-icon> : ''}
          <div>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
