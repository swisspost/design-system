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

  /**
   * Defines the label text
   */
  @Prop() labelText: string;

  /**
   * Defines the selected workaround
   */
  @Prop() workaround?: string;

  private setAriaLabel() {
    const selector = `#${this.for}`;
    const targetInput = document.querySelector(selector);
    if (this.workaround == 'arialabel') {
      targetInput.setAttribute('aria-label', this.labelText);
    } else {
      targetInput.removeAttribute('aria-label');
    }
  }

  componentDidLoad() {
    this.setAriaLabel();
  }

  componentDidUpdate() {
    this.setAriaLabel();
  }

  render() {
    return (
      <Host data-version={version}>
        <label htmlFor={this.for}>{this.labelText}</label>
        <slot></slot>
      </Host>
    );
  }
}
