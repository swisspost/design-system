import { Pattern, Required, Type } from '@/utils';
import { version } from '@root/package.json';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';

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
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textCurrentStep!: string;

  /**
   * "Completed step" label for accessibility
   */
  @Prop({ reflect: true })
  @Required()
  @Type('string')
  textCompletedStep!: string;

  /**
   * Label for the "Step {number}:" indicator for mobile view.
   * Use `{number}` as a placeholder — it will be replaced with the current step number at runtime.
   */
  @Prop({ reflect: true })
  @Required()
  @Pattern(/\{number\}/)
  textStepNumber!: string;

  /**
   * Defines the current step, which is the next step the user has to complete.
   */
  @Prop()
  @Required()
  @Type('number')
  currentIndex: number = -1;

  @Watch('currentIndex')
  validateCurrentIndex() {
    if (this.stepItems) {
      this.updateSteps();
      this.checkIndexes();
    }
  }

  /**
   * Defines the selected (active) step, which is the step the user is currently on.
   * If not defined, the selected step is the current step.
   */
  @Prop()
  @Type('number')
  selectedIndex?: number;

  @Watch('selectedIndex')
  validateSelectedIndex() {
    if (this.selectedIndex === undefined) {
      this.selectedIndex = this.currentIndex;
    } else {
      this.checkIndexes();
    }

    this.updateSteps();
  }

  @Watch('textStepNumber')
  updateActiveStepNumber() {
    if (this.textStepNumber) {
      const labelTemplate = this.textStepNumber;
      this.mobileActiveStepLabel = labelTemplate.replaceAll(
        '{number}',
        `${this.selectedIndex + 1}`,
      );
      if (this.stepItems) {
        this.updateMobileActiveStepVisibility();
      }
    }
  }

  componentDidLoad() {
    // Wait for slotchange
    setTimeout(() => {
      this.validateCurrentIndex();
      this.validateSelectedIndex();
    });
  }

  private checkIndexes() {
    if (this.selectedIndex > this.currentIndex) {
      console.error(
        'The selected-index cannot be higher than the current-index, as only the current and completed steps can be selected.',
      );
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
      if (this.selectedIndex === i) {
        this.mobileActiveStepName = el.innerHTML;
      }

      // Update "post-stepper-item" classes to show correct status
      el.classList.toggle('stepper-item-completed', this.currentIndex > i);
      el.classList.toggle('stepper-item-current', this.currentIndex === i);
      el.classList.toggle('stepper-item-selected', this.selectedIndex === i);
      el.classList.toggle('stepper-item-inactive', this.currentIndex < i);
      el.classList.toggle('stepper-item-after-current', i === this.currentIndex + 1);

      // Update accessibility label depending on status (Completed/Current/-)
      const hiddenLabel = el.shadowRoot?.querySelector('.step-hidden-label');

      if (hiddenLabel) {
        let labelText = '';

        if (this.currentIndex > i) {
          labelText = `${this.textCompletedStep}: `;
        }

        if (this.selectedIndex === i) {
          labelText = `${labelText}${this.textCurrentStep}: `;
        }

        hiddenLabel.textContent = labelText;
      }

      // Update accessibility aria attributes
      if (this.selectedIndex === i) {
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
    if (this.selectedIndex >= this.stepItems.length || this.selectedIndex < 0) {
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
          <span class="active-step-label">{this.mobileActiveStepLabel}</span>
          <span innerHTML={this.mobileActiveStepName}></span>
        </div>
      </Host>
    );
  }
}
