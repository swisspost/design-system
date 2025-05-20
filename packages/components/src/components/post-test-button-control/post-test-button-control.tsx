import { Component, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'post-test-button-control',
  styleUrl: 'post-test-button-control.scss',
  shadow: true,
})
export class PostTestButtonControl {
  @Element() hostEl: HTMLPostTestButtonControlElement;
  private internalEl: HTMLElement;

  private readonly handleToggleClick = () => {
    if (this.hostEl && this.internalEl) {
      const timestamp = Date.now();
      this.internalEl.innerHTML = `<p>Controlled Text shown at ${timestamp}.</p>`;
    }
  };

  render() {
    return (
      <Host
        role="button"
        tabindex="0"
        aria-expanded="false"
        aria-controls="text2"
        onClick={this.handleToggleClick}
      >
        Toggle Text
        <div
          class="btn btn-primary"
          aria-live="assertive"
          id="text2"
          ref={el => {
            if (el) this.internalEl = el as HTMLElement;
          }}
        >
          <p>Controlled Text shown at xxxxxxxxxxx.</p>
        </div>
      </Host>
    );
  }
}
