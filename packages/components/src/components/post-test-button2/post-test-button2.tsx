import { Component, h, Host, Prop } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-test-button2',
  styleUrl: 'post-test-button2.scss',
  shadow: { delegatesFocus: true },
})
export class PostTestButton2 {
  private internalEl: HTMLElement;
  /**
   * Defines the selected workaround
   */
  @Prop() workaround?: string;

  /**
   * Defines the selected ariaLabelledbyId
   */
  @Prop() ariaLabelledbyId?: string;

  /**
   * Defines the selected ariaDescribedbyId
   */
  @Prop() ariaDescribedbyId?: string;

  private setProperties() {
    if (this.internalEl) {
      const arialabelEl = document.querySelector(`[id=${this.ariaLabelledbyId}]`);
      const ariadescEl = document.querySelector(`[id=${this.ariaDescribedbyId}]`);

      if (this.workaround == 'ariaLabelledByElements') {
        this.internalEl.ariaLabelledByElements = [arialabelEl];
      } else {
        this.internalEl.ariaLabelledByElements = [];
      }

      if (this.workaround == 'ariaDescribedByElements') {
        this.internalEl.ariaDescribedByElements = [ariadescEl];
      } else {
        this.internalEl.ariaDescribedByElements = [];
      }
    }
  }

  componentDidLoad() {
    this.setProperties();
  }

  componentDidUpdate() {
    this.setProperties();
  }

  render() {
    return (
      // Shadow DOM - Same Shadow DOM
      <Host data-version={version} class="btn btn-primary">
        <slot name="label-slot"></slot>
        <div ref={el => (this.internalEl = el as HTMLElement)} role="button" tabindex="0">
          <post-icon name="1022"></post-icon>
        </div>
      </Host>
    );
  }
}
