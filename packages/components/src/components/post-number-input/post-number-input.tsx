import { Component, Element, Host, h, Prop, Watch, State } from '@stencil/core';
import { version } from '@root/package.json';
import { getSlottedElement, checkEmptyOrType, repeatOnLongPress } from '@/utils';

@Component({
  tag: 'post-number-input',
  styleUrl: 'post-number-input.scss',
  shadow: true,
})
export class PostNumberInput {
  @Element() host: HTMLPostNumberInputElement;

  @State() isIncrementDisabled = false;
  @State() isDecrementDisabled = false;

  private input: HTMLInputElement | null;
  private mutationObserver: MutationObserver;

  /**
   * The icon to be used in the control that increases the number in the input.
   */
  @Prop() incrementIcon = 'plus';

  @Watch('incrementIcon')
  validateIncrementIcon() {
    checkEmptyOrType(this, 'incrementIcon', 'string');
  }

  /**
   * The icon to be used in the control that decreases the number in the input.
   */
  @Prop() decrementIcon = 'minus';

  @Watch('decrementIcon')
  validateDecrementIcon() {
    checkEmptyOrType(this, 'decrementIcon', 'string');
  }

  componentWillLoad() {
    this.setupInput();
  }

  componentDidLoad() {
    this.validateIncrementIcon();
    this.validateDecrementIcon();
  }

  private setupInput() {
    if (this.input) return;

    this.input = getSlottedElement(this.host, 'input[type="number"]');

    // step buttons may be disabled when the input loads
    this.updateStepButtonState();

    // step buttons may become disabled after the value is changed via keyboard / typing
    this.input.addEventListener('input', () => this.updateStepButtonState());

    // step buttons may become disabled after the input attributes change
    this.mutationObserver = new MutationObserver(() => this.updateStepButtonState());
    this.mutationObserver.observe(this.input, {
      attributes: true,
      attributeFilter: ['min', 'max'],
    });
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private step(direction: 'up' | 'down') {
    repeatOnLongPress(() => {
      if (direction === 'up') {
        this.input.stepUp();
      } else {
        this.input.stepDown();
      }

      this.updateStepButtonState();
    });
  }

  private updateStepButtonState() {
    const min = parseFloat(this.input.min);
    const max = parseFloat(this.input.max);
    const value = parseFloat(this.input.value);

    this.isIncrementDisabled = !isNaN(max) && value >= max;
    this.isDecrementDisabled = !isNaN(min) && value <= min;
  }

  render() {
    return (
      <Host data-version={version}>
        <div
          aria-hidden="true"
          onPointerDown={() => this.step('down')}
          class={{ 'step-button': true, 'disabled': this.isDecrementDisabled }}
        >
          <post-icon name={this.decrementIcon}></post-icon>
        </div>
        <div class="input-container">
          <slot onSlotchange={() => this.setupInput()}></slot>
        </div>
        <div
          aria-hidden="true"
          onPointerDown={() => this.step('up')}
          class={{ 'step-button': true, 'disabled': this.isIncrementDisabled }}
        >
          <post-icon name={this.incrementIcon}></post-icon>
        </div>
      </Host>
    );
  }
}
