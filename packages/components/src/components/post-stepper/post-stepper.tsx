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
  @State() mobileActiveStepLabel: string;

  /**
   * Active step name is for visual purposes on mobile only
   */
  @State() mobileActiveStepName: string;

  /**
   * "Current step" label for accessibility
   */
  @Prop({ reflect: true }) currentLabel!: string;

  @Watch('currentLabel')
  validateCurrentLabel() {
    checkRequiredAndType(this, 'currentLabel', 'string');
  }

  /**
   * "Completed step" label for accessibility
   */
  @Prop({ reflect: true }) completedLabel!: string;

  @Watch('completedLabel')
  validateCompletedLabel() {
    checkRequiredAndType(this, 'completedLabel', 'string');
  }

  /**
   * Label for the "Step N:" indicator for mobile view.
   * Use `#index` as a placeholder — it will be replaced with the current step number at runtime.
   */
  @Prop({ reflect: true }) activeStepLabel!: string;

  @Watch('activeStepLabel')
  validateActiveStepLabel() {
    checkRequiredAndPattern(this, 'activeStepLabel', /#index\b/);
    this.updateActiveStepLabel();
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
    this.validateCompletedLabel();
    this.validateCurrentLabel();
    this.validateActiveStepLabel();

    // Wait for slotchange
    setTimeout(() => {
      this.validateCurrentIndex();
    });
  }

  private updateActiveStepLabel() {
    if (this.activeStepLabel) {
      const labelTemplate = this.activeStepLabel;
      this.mobileActiveStepLabel = labelTemplate.replace(/#index/g, `${this.currentIndex + 1}`);
      this.updateMobileActiveStepVisibility();
    }
  }

  private updateSteps() {
    this.stepItems = this.host.querySelectorAll('post-stepper-item');

    if (!this.stepItems || this.stepItems.length < 3) {
      console.error('The post-stepper component should have at least three steps.');
      return;
    }

    this.updateActiveStepLabel();

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

    this.updateMobileActiveStepVisibility();
  }

  private updateMobileActiveStepVisibility() {
    if (this.currentIndex >= this.stepItems.length || this.currentIndex < 0) {
      this.mobileActiveStepLabel = '';
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
          {this.mobileActiveStepLabel}
          <span innerHTML={this.mobileActiveStepName}></span>
        </div>
      </Host>
    );
  }
}
