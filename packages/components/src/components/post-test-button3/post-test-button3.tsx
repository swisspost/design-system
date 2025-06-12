import { Component, h, Host, Prop } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-test-button3',
  styleUrl: 'post-test-button3.scss',
  shadow: true,
})
export class PostTestButton3 {
  /**
   * Defines the ariaLabelledbyId
   */
  @Prop() ariaLabelledbyId?: string;

  /**
   * Defines the ariaDescribedbyId
   */
  @Prop() ariaDescribedbyId?: string;

  private slotEl: HTMLSlotElement | undefined;
  private internalEl: HTMLElement | undefined;

  /**
   * Defines the selected workaround
   */
  @Prop() workaround?: string;

  private setProperties() {
    if (this.slotEl && this.internalEl) {
      if (this.workaround == 'ariaLabelledByElements') {
        const assignedElements = this.slotEl.assignedElements({ flatten: true });
        const labelElement = assignedElements[0];
        console.log(labelElement);
        if (labelElement) {
          this.internalEl.ariaLabelledByElements = [labelElement];
        } else {
          this.internalEl.ariaLabelledByElements = [];
        }
      }

      if (this.workaround == 'ariaDescribedByElements') {
        const assignedElements = this.slotEl.assignedElements({ flatten: true });
        const descElement = assignedElements[0];

        if (descElement) {
          this.internalEl.ariaDescribedByElements = [descElement];
        } else {
          this.internalEl.ariaDescribedByElements = [];
        }
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
        <slot name="label-slot" ref={el => (this.slotEl = el as HTMLSlotElement)}></slot>
        <div ref={el => (this.internalEl = el as HTMLElement)} role="button" tabindex="0">
          <post-icon name="1022"></post-icon>
        </div>
      </Host>
    );
  }
}
