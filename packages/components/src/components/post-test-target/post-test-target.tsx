// This provides a type declaration merge to include the ariaLabelledByElements
// property on the Element interface

declare global {
  interface Element {
    ariaLabelledByElements: Element[];
  }
}

import { Component, h, Host, Prop, Element } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-test-target',
  styleUrl: 'post-test-target.scss',
  shadow: true,
})
export class PostTestTarget {
  @Element() host: HTMLPostTestTargetElement;

  private internalEl: HTMLElement | undefined;
  /**
   * Defines the selected workaround
   */
  @Prop() workaround?: string;

  /**
   * Defines the selected workaround
   */
  @Prop() ariaLabelledbyId?: string;

  private setAriaLabelledByElements() {
    const labelEl = document.querySelector(`[for=${this.ariaLabelledbyId}]`);
    if (this.workaround == 'ariamixin') {
      this.internalEl.ariaLabelledByElements = [labelEl];
    } else {
      this.internalEl.ariaLabelledByElements = [];
    }
  }

  componentDidLoad() {
    this.setAriaLabelledByElements();
  }

  componentDidUpdate() {
    this.setAriaLabelledByElements();
  }

  render() {
    return (
      <Host data-version={version}>
        {/* This could be <input>, <button>, <input>, <select>, <textarea>, <meter>, <object>, <output>, <progress>, or form-associated Custom Elements*/}
        <input ref={el => (this.internalEl = el as HTMLElement)}></input>
        <slot></slot>
      </Host>
    );
  }
}
