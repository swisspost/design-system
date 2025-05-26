import { Component, h, Host, Element, Prop } from '@stencil/core';

declare global {
  interface Element {
    ariaControlsElements: Element[];
  }
}

@Component({
  tag: 'post-test-button-control',
  styleUrl: 'post-test-button-control.scss',
  shadow: true,
})
export class PostTestButtonControl {
  @Element() host: HTMLPostTestButtonControlElement;

  private internalEl: HTMLElement;

  private readonly handleToggleClick = () => {
    if (this.host && this.internalEl) {
      const timestamp = Date.now();
      this.internalEl.innerHTML = `<p>Controlled Text shown at ${timestamp}.</p>`;
    }
  };

  /**
   * Defines the selected workaround
   */
  @Prop() workaround?: string;

  /**
   * Defines the ariaContols id
   */
  @Prop() ariaControlsId?: string;

  private setProperties() {
    if (this.host) {
      if (this.workaround == 'ariaControlsElements') {
        console.log(this.internalEl);
        this.host.ariaControlsElements = [this.internalEl];
        console.log(this.host.ariaControlsElements);
      } else {
        this.host.ariaControlsElements = [];
      }
    }
  }

  componentWillLoad() {
    this.setProperties();
  }

  componentDidUpdate() {
    this.setProperties();
  }

  render() {
    return (
      <Host role="button" tabindex="0" onClick={this.handleToggleClick}>
        Toggle Text
        <div
          aria-live="assertive"
          id={this.workaround === 'none' ? this.ariaControlsId : ''}
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
