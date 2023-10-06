import { Component, Element, h, Host, Prop } from '@stencil/core';

import { version } from '../../../package.json';

/**
 * @class PostCardControl - representing a stencil component
 */
@Component({
  tag: 'post-card-control',
  styleUrl: 'post-card-control.scss',
  shadow: true,
})
export class PostCardControl {
  @Element() host: HTMLPostCardControlElement;

  /**
   * Defines the `type` of the input inside the card.
   */
  @Prop() readonly type: string = 'checkbox';

  /**
   * Defines the `id` of the input inside the card.
   */
  @Prop() readonly inputid: string = '';

  onChange(e: Event) {
    const action = (e.target as HTMLInputElement).checked ? 'add' : 'remove';
    this.host.classList[action]('checked');
  }

  render() {
    return (
      <Host data-version={version}>
        <div class="card-control--header">
          <input
            type={this.type}
            id={this.inputid}
            class="header--input form-check-input"
            onChange={this.onChange.bind(this)}
          />

          <label htmlFor={this.inputid} class="header--label form-check-label">
            <slot name="label"></slot>
            <div class="header--description">
              <slot name="description"></slot>
            </div>
          </label>

          <post-icon name="1000" class="header--icon"></post-icon>
        </div>

        <div class="card-control--content">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
