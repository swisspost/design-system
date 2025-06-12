import { Component, h, Host, Prop } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-test-button',
  styleUrl: 'post-test-button.scss',
  shadow: true,
})
export class PostTestButton {
  /**
   * Defines the ariaLabelledbyId
   */
  @Prop() ariaLabelledbyId?: string;

  /**
   * Defines the ariaDescribedbyId
   */
  @Prop() ariaDescribedbyId?: string;

  render() {
    return (
      // Shadow DOM - Same Shadow DOM
      <Host
        data-version={version}
        class="btn btn-primary"
        role="button"
        tabindex="0"
        aria-labelledby={this.ariaLabelledbyId}
        aria-describedby={this.ariaDescribedbyId}
      >
        <slot name="label-slot"></slot>
        <div>
          <post-icon name="1022"></post-icon>
        </div>
      </Host>
    );
  }
}
