import { Component, h, Host, Prop, Element } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-test-example3',
  styleUrl: 'post-test-example3.scss',
  shadow: true,
})
export class PostTestExample3 {
  @Element() host: HTMLPostTestExample3Element;

  /**
   * Defines the id
   */
  @Prop() theId?: string;

  /**
   * Defines the selected workaround
   */
  @Prop() workaround?: string;

  /**
   * Defines the text of the retrieved label
   */
  @Prop() foundLabelText?: string;

  private setAriaLabel() {
    const selector = `#${this.theId}`;
    const targetInput = document.querySelector(selector);

    const lightDOMLabel = this.host.shadowRoot.querySelector(`label[for="${this.theId}"]`);

    if (lightDOMLabel) {
      this.foundLabelText = lightDOMLabel.textContent;
    }
    if (this.workaround == 'arialabel') {
      targetInput.setAttribute('aria-label', this.foundLabelText);
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
      // Shadow DOM - Light DOM
      <Host data-version={version}>
        <label htmlFor={this.theId}>Label Text</label>
        <slot></slot>
      </Host>
    );
  }
}
