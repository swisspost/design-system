import { Component, h, Host, Prop, Element } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-test-target2',
  styleUrl: 'post-test-target2.scss',
  shadow: true,
})
export class PostTestTarget2 {
  @Element() host: HTMLPostTestTarget2Element;

  private slotEl: HTMLSlotElement | undefined;
  private internalEl: HTMLElement | undefined;

  /**
   * Defines the selected workaround
   */
  @Prop() workaround?: string;

  private setupInputLabelingFromSlot() {
    if (this.slotEl && this.internalEl && this.workaround == 'ariamixin') {
      const assignedElements = this.slotEl.assignedElements({ flatten: true });
      const labelElement = assignedElements.find(el => el.tagName === 'LABEL');

      if (labelElement) {
        this.internalEl.ariaLabelledByElements = [labelElement];
      }
    } else {
      this.internalEl.ariaLabelledByElements = [];
    }
  }

  componentDidLoad() {
    this.setupInputLabelingFromSlot();
  }

  componentDidUpdate() {
    this.setupInputLabelingFromSlot();
  }

  render() {
    return (
      <Host data-version={version}>
        {/* This could be <input>, <button>, <input>, <select>, <textarea>, <meter>, <object>, <output>, <progress>, or form-associated Custom Elements*/}
        <slot name="label-slot" ref={el => (this.slotEl = el as HTMLSlotElement)}></slot>
        <input ref={el => (this.internalEl = el as HTMLElement)}></input>
      </Host>
    );
  }
}
