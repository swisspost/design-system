import { Component, h, Host, Prop } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-test-label',
  styleUrl: 'post-test-label.scss',
  shadow: true,
})
export class PostTestLabel {
  /**
   * Defines the for
   */
  @Prop() for?: string;

  private internalEl: HTMLElement | undefined;

  componentDidLoad() {
    const targetEl = document.querySelector('#' + this.for);
    if (targetEl) targetEl.ariaLabelledByElements = [this.internalEl];
  }

  render() {
    return (
      <Host data-version={version} for={this.for}>
        <label ref={el => (this.internalEl = el as HTMLElement)} id={this.for} htmlFor={this.for}>
          My Text
        </label>
        <slot></slot>
      </Host>
    );
  }
}
