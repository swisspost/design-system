import { Component, Element, Host, h, Prop, Watch, State } from '@stencil/core';
import { debounce } from 'throttle-debounce';
import { version } from '@root/package.json';
import { getSlottedElement, checkEmptyOrType, repeatOnLongPress } from '@/utils';

function parseNumber(input: HTMLInputElement, key: 'value' | 'min' | 'max'): number | undefined {
  const value = parseFloat(input[key]);
  return isNaN(value) ? undefined : value;
}

function compare(
  value: number | undefined,
  bound: number | undefined,
  comparator: (value: number, bound: number) => boolean,
): boolean {
  return value !== undefined && bound !== undefined && comparator(value, bound);
}

@Component({
  tag: 'post-number-input',
  styleUrl: 'post-number-input.scss',
  shadow: true,
})
export class PostNumberInput {
  @Element() host: HTMLPostNumberInputElement;

  @State() isIncrementDisabled = false;
  @State() isDecrementDisabled = false;
  @State() input: HTMLInputElement | null;

  private mutationObserver: MutationObserver;

  get value(): number | undefined {
    return parseNumber(this.input, 'value');
  }

  get min(): number | undefined {
    return parseNumber(this.input, 'min');
  }

  get max(): number | undefined {
    return parseNumber(this.input, 'max');
  }

  get isAtMin(): boolean {
    return compare(this.value, this.min, (v, m) => v === m);
  }

  get isAtMax(): boolean {
    return compare(this.value, this.max, (v, m) => v === m);
  }

  get isBelowMin(): boolean {
    return compare(this.value, this.min, (v, m) => v < m);
  }

  get isAboveMax(): boolean {
    return compare(this.value, this.max, (v, m) => v > m);
  }

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

  private setupInput = debounce(50, () => {
    this.input = this.input ?? getSlottedElement(this.host, 'input[type="number"]');

    if (!this.input) return;

    // step buttons may be disabled when the input loads
    this.updateStepButtonState();

    // step buttons may become disabled after the value is changed via keyboard / typing
    this.input.addEventListener('input', () => this.updateStepButtonState());

    // step buttons may become disabled after the input attributes change
    this.mutationObserver = new MutationObserver(() => this.updateStepButtonState());
    this.mutationObserver.observe(this.input, {
      attributes: true,
      attributeFilter: ['min', 'max', 'disabled'],
    });
  });

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private step(direction: 'up' | 'down') {
    const isIncrementing = direction === 'up';

    repeatOnLongPress(() => {
      const isAtBound = isIncrementing ? this.isAtMax : this.isAtMin;
      if (isAtBound) return;

      const needsClamp = isIncrementing ? this.isBelowMin : this.isAboveMax;

      if (needsClamp) {
        this.input.value = isIncrementing ? this.input.min : this.input.max;
      } else {
        const stepFn = isIncrementing ? this.input.stepUp : this.input.stepDown;
        stepFn.call(this.input);
      }

      this.updateStepButtonState();
    });
  }

  private updateStepButtonState() {
    const hasInvalidRange = this.min && this.max && this.min > this.max;

    if (this.input.disabled || hasInvalidRange) {
      this.isIncrementDisabled = this.isDecrementDisabled = true;
    } else {
      this.isIncrementDisabled = this.isAtMax || this.isAboveMax;
      this.isDecrementDisabled = this.isAtMin || this.isBelowMin;
    }
  }

  render() {
    const areButtonsShown = !!this.input;

    return (
      <Host data-version={version}>
        {areButtonsShown && (
          <div
            aria-hidden="true"
            onPointerDown={() => this.step('down')}
            class={{ 'step-button': true, 'disabled': this.isDecrementDisabled }}
          >
            <post-icon name={this.decrementIcon}></post-icon>
          </div>
        )}
        <div class="input-container">
          <slot onSlotchange={() => this.setupInput()}></slot>
        </div>
        {areButtonsShown && (
          <div
            aria-hidden="true"
            onPointerDown={() => this.step('up')}
            class={{ 'step-button': true, 'disabled': this.isIncrementDisabled }}
          >
            <post-icon name={this.incrementIcon}></post-icon>
          </div>
        )}
      </Host>
    );
  }
}
