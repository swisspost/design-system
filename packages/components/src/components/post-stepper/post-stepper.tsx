import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import { checkRequiredAndPattern, checkRequiredAndType } from '@/utils';

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
  @State() mobileActiveStepNumber: string;

  /**
   * Active step name is for visual purposes on mobile only
   */
  @State() mobileActiveStepName: string;

  /**
   * "Current step" label for accessibility
   */
  @Prop({ reflect: true }) textCurrentStep!: string;

  @Watch('textCurrentStep')
  validateTextCurrentStep() {
    checkRequiredAndType(this, 'textCurrentStep', 'string');
  }

  /**
   * "Completed step" label for accessibility
   */
  @Prop({ reflect: true }) textCompletedStep!: string;

  @Watch('textCompletedStep')
  validateTextCompletedStep() {
    checkRequiredAndType(this, 'textCompletedStep', 'string');
  }

  /**
   * Label for the "Step N:" indicator for mobile view.
   * Use `#index` as a placeholder — it will be replaced with the current step number at runtime.
   */
  @Prop({ reflect: true }) textStepNumber!: string;

  @Watch('textStepNumber')
  validateTextStepNumber() {
    checkRequiredAndPattern(this, 'textStepNumber', /#index\b/);
    this.updateActiveStepNumber();
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

  connectedCallback() {
    this.stepItems = document.querySelectorAll(null);
  }

  componentDidLoad() {
    this.validateTextCompletedStep();
    this.validateTextCurrentStep();
    this.validateTextStepNumber();

    // Wait for slotchange
    setTimeout(() => {
      this.validateCurrentIndex();
    });
  }

  private updateActiveStepNumber() {
    if (this.textStepNumber) {
      const labelTemplate = this.textStepNumber;
      this.mobileActiveStepNumber = labelTemplate.replace(/#index/g, `${this.currentIndex + 1}`);
      this.updateMobileActiveStepVisibility();
    }
  }

  private updateSteps() {
    this.stepItems = this.host.querySelectorAll('post-stepper-item');

    if (!this.stepItems || this.stepItems.length < 3) {
      console.error('The post-stepper component should have at least three steps.');
      return;
    }

    this.updateActiveStepNumber();

    this.stepItems.forEach((el, i) => {
      if (this.currentIndex === i) {
        this.mobileActiveStepName = el.querySelector('.label').innerHTML;
      }

      // Update "post-stepper-item" classes to show correct status
      el.classList.toggle('stepper-item-completed', this.currentIndex > i);
      el.classList.toggle('stepper-item-current', this.currentIndex === i);
      el.classList.toggle('stepper-item-inactive', this.currentIndex < i);

      // Update accessibility label depending on status (Completed/Current/-)
      const hiddenLabel = el.querySelector('.step-hidden-label');
      if (hiddenLabel) {
        let labelText = '';

        if (this.currentIndex > i) {
          labelText = `${this.textCompletedStep}:`;
        } else if (this.currentIndex === i) {
          labelText = `${this.textCurrentStep}:`;
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

    this.updateMobileActiveStepVisibility();
  }

  private updateMobileActiveStepVisibility() {
    if (this.currentIndex >= this.stepItems.length || this.currentIndex < 0) {
      this.mobileActiveStepNumber = '';
      this.mobileActiveStepName = '';
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <ol>
          <slot onSlotchange={() => this.updateSteps()}></slot>
        </ol>
        <div class="active-step" aria-hidden="true">
          {this.mobileActiveStepNumber}
          <span innerHTML={this.mobileActiveStepName}></span>
        </div>
      </Host>
    );
  }
}
