import { Component, h, Host } from '@stencil/core';
import { version } from '@root/package.json';

@Component({
  tag: 'post-stepper-item',
  styleUrl: 'post-stepper-item.scss',
  shadow: false,
})
export class PostStepperItem {
  render() {
    return (
      <Host data-version={version} role="listitem">
        <span class="stepper-item-content">
          <span class="step-hidden-label visually-hidden"></span>
          <span class="step-mobile-label"></span>
          <span class="label">
            <slot></slot>
          </span>
        </span>
      </Host>
    );
  }
}
