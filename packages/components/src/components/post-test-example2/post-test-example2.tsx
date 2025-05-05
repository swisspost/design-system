import { Component, h, Host, Prop } from '@stencil/core';
import { version } from '@root/package.json';

declare interface HTMLInputElementPlus extends HTMLInputElement {
  ariaLabelledByElements: Element | Element[] | null;
}

@Component({
  tag: 'post-test-example2',
  styleUrl: 'post-test-example2.scss',
  shadow: true,
})
export class PostTestExample2 {
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

  private updateWorkaround() {
    const lightDOMLabel = document.querySelector(`label[for="${this.theId}"]`);

    if (this.workaround == 'ariamixin') {
      const customElement = document.querySelector(`post-test-example2[the-id="${this.theId}"]`);
      const internalInput = customElement.shadowRoot.querySelector('input') as HTMLInputElementPlus;
      internalInput.ariaLabelledByElements = [lightDOMLabel];
    }
    if (this.workaround == 'arialabel') {
      const lightDOMLabel = document.querySelector(`label[for="${this.theId}"]`);
      if (lightDOMLabel) {
        this.foundLabelText = lightDOMLabel.textContent;
      }
    }
  }
  componentDidLoad() {
    this.updateWorkaround();
  }

  componentDidUpdate() {
    this.updateWorkaround();
  }

  render() {
    return (
      //Slotted Content - Shadow DOM (since slotted content is in the Light DOM)
      <Host data-version={version}>
        <input
          id={this.theId}
          value=""
          placeholder="Placeholder"
          aria-label={this.workaround == 'arialabel' ? this.foundLabelText : ''}
        />
        <slot></slot>
      </Host>
    );
  }
}
