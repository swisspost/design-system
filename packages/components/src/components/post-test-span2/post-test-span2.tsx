import { Component, h, Host, Prop, Element } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-test-span2',
  styleUrl: 'post-test-span2.scss',
  shadow: true,
})
export class PostTestSpan2 {
  @Element() host: HTMLPostTestSpan2Element;

  /**
   * Defines the spanId
   */
  @Prop() spanId?: string;

  /**
   * Defines the label text
   */
  @Prop() labelText: string;

  /**
   * Defines the id of the button to reference
   */
  @Prop() btnId: string;

  /**
   * Defines the selected workaround
   */
  @Prop() workaround?: string;

  private setAriaLabel() {
    const selector = `#${this.btnId}`;
    const targetInput = document.querySelector(selector);
    if (targetInput) {
      if (this.workaround == 'arialabel') {
        targetInput.setAttribute('aria-label-text', this.labelText);
      } else {
        targetInput.removeAttribute('aria-label-text');
      }
    }
  }

  componentWillLoad() {
    this.setAriaLabel();
  }

  componentDidUpdate() {
    this.setAriaLabel();
  }

  render() {
    return (
      <Host data-version={version}>
        <span>My Text</span>
        <slot></slot>
      </Host>
    );
  }
}
