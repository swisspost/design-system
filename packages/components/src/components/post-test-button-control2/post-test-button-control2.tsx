import { Component, h, Host, Element, Prop } from '@stencil/core';

@Component({
  tag: 'post-test-button-control2',
  styleUrl: 'post-test-button-control2.scss',
  shadow: true,
})
export class PostTestButtonControl {
  @Element() hostEl: HTMLPostTestButtonControl2Element;
  // private internalEl: HTMLElement;

  // private readonly handleToggleClick = () => {
  //   if (this.hostEl && this.internalEl) {
  //     const timestamp = Date.now();
  //     this.internalEl.innerHTML = `<p>Text shown at ${timestamp}.</p>`;
  //   }
  // };

  /**
   * Defines the selected workaround
   */
  @Prop() workaround?: string;

  render() {
    return (
      <Host>
        Button
        <div role="button" tabindex="0" aria-live="assertive" id="text2">
          <p>Text shown at xxxxxxxxxxx.</p>
        </div>
      </Host>
    );
  }
}
