import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndType } from '@/utils';

@Component({
  tag: 'post-stepper',
  styleUrl: 'post-stepper.scss',
  shadow: true,
})
export class PostStepper {
  @Element() host: HTMLPostStepperElement;

  private stepItems: NodeListOf<HTMLPostStepperItemElement>;

  /**
   * Active step label is for visual purposes on mobile only
   */
  @State() activeStepLabel: string;

  /**
   * "Current step" label for accessibility
   */
  @Prop() currentLabel!: string;

  @Watch('currentLabel')
  validateCurrentLabel() {
    checkRequiredAndType(this, 'currentLabel', 'string');
  }

  /**
   * "Completed step" label for accessibility
   */
  @Prop() completedLabel!: string;

  @Watch('completedLabel')
  validateCompletedLabel() {
    checkRequiredAndType(this, 'completedLabel', 'string');
  }

  /**
   * "Step" label for mobile view
   */
  @Prop() stepLabel!: string;

  @Watch('stepLabel')
  validateStepLabel() {
    checkRequiredAndType(this, 'stepLabel', 'string');
  }

  /**
   * Defines the currently active step
   */
  @Prop() currentIndex: number = -1;

  @Watch('currentIndex')
  validateCurrentIndex() {
    checkRequiredAndType(this, 'currentIndex', 'number');
    this.updateSteps();
  }

  componentDidLoad() {
    this.validateStepLabel();
    this.validateCompletedLabel();
    this.validateCurrentLabel();

    // Wait for slotchange
    setTimeout(() => {
      this.validateCurrentIndex();
    });
  }

  private updateSteps() {
    this.stepItems = this.host.querySelectorAll('post-stepper-item');

    if (!this.stepItems || this.stepItems.length < 3) {
      console.error('The post-stepper component should have at least three steps.');
      return;
    }

    this.stepItems.forEach((el, i) => {
      if (this.stepLabel) {
        el.querySelector('.step-mobile-label').textContent = `${this.stepLabel} ${i + 1}:`;
      }

      if (this.currentIndex === i) {
        this.activeStepLabel = `${this.stepLabel} ${i + 1}: ${
          el.querySelector('.label').textContent
        }`;
      }

      // Update "post-stepper-item" classes to show correct status
      el.classList.toggle('stepper-item-completed', this.currentIndex > i);
      el.classList.toggle('stepper-item-current', this.currentIndex === i);
      el.classList.toggle('stepper-item-inactive', this.currentIndex < i);

      // Update mobile label to show "Step N: ..." on mobile
      const mobileLabel = el.querySelector('.step-mobile-label');
      if (mobileLabel && this.stepLabel) {
        mobileLabel.textContent = `${this.stepLabel} ${i + 1}:`;
      }

      // Update accessibility label depending on status (Completed/Current/-)
      const hiddenLabel = el.querySelector('.step-hidden-label');
      if (hiddenLabel) {
        let labelText = '';

        if (this.currentIndex > i) {
          labelText = `${this.completedLabel}:`;
        } else if (this.currentIndex === i) {
          labelText = `${this.currentLabel}:`;
        }

        hiddenLabel.textContent = labelText;
      }

      // Update accessibility aria attributes
      if (this.currentIndex === i) {
        el.setAttribute('aria-current', 'step');
        el.setAttribute('aria-live', 'polite');
      } else {
        el.removeAttribute('aria-current');
        el.removeAttribute('aria-live');
      }
    });

    if (this.currentIndex >= this.stepItems.length || this.currentIndex < 0) {
      this.activeStepLabel = '';
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <ol>
          <slot onSlotchange={() => this.updateSteps()}></slot>
        </ol>
        <div class="active-step" aria-hidden="true">
          {this.activeStepLabel}
        </div>
      </Host>
    );
  }
}
