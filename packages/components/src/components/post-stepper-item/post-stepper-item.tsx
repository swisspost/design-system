import { Component, Element, h, Host } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-stepper-item',
  styleUrl: 'post-stepper-item.scss',
  shadow: false,
})
export class PostStepperItem {
  @Element() host: HTMLPostStepperItemElement;

  render() {
    return (
      <Host data-version={version} role="listitem">
        <span class="stepper-item-content">
          <span>
            <span class="step-hidden-label visually-hidden"></span>
            <span class="step-mobile-label"></span>
            <slot></slot>
          </span>
        </span>
      </Host>
    );
  }
}
