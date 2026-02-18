import { Component, Element, Event, EventEmitter, Host, h, Prop, Watch } from '@stencil/core';
import { version } from '@root/package.json';
import {
  checkEmptyOrArrayOf,
  checkEmptyOrType,
  checkRequiredAndOneOf,
  checkRequiredAndType,
} from '@/utils';
import { Orientation, ORIENTATIONS } from '@/components/post-slider/orientation';
import { ActiveThumb } from '@/components/post-slider/active-thumb';
import { clamp } from '@/utils/clamp';

@Component({
  tag: 'post-slider',
  styleUrl: 'post-slider.scss',
  shadow: true,
})
export class PostSlider {
  @Element() host: HTMLPostSliderElement;

  private activeThumb: ActiveThumb | null = null;

  /**
   * The greatest value in the range of permitted values.
   */
  @Prop() max = 100;
  @Watch('max')
  validateMax() {
    checkRequiredAndType(this, 'max', 'number');
  }

  /**
   * The lowest value in the range of permitted values.
   */
  @Prop() min = 0;
  @Watch('min')
  validateMin() {
    checkRequiredAndType(this, 'min', 'number');
  }

  /**
   * The orientation of the slider: "horizontal" or "vertical".
   */
  @Prop({ reflect: true }) orient: Orientation = 'horizontal';
  @Watch('orient')
  validateOrient() {
    checkRequiredAndOneOf(this, 'orient', ORIENTATIONS);
  }

  /**
   * If true, the slider has two thumbs allowing for range selection.
   */
  @Prop() range = false;
  @Watch('range')
  validateRange() {
    checkRequiredAndType(this, 'range', 'boolean');
  }

  /**
   * The granularity that the value must adhere to.
   */
  @Prop() step: number | 'any' = 1;
  @Watch('step')
  validateStep() {
    // because of the mixed type the step is always a string, we have to parse it manually
    if (this.step !== 'any' && typeof this.step !== 'number') {
      this.step = parseFloat(this.step);
      checkRequiredAndType(this, 'step', 'number');
    }
  }

  /**
   * The number or range initially selected.
   */
  @Prop() value?: number | [number, number];
  @Watch('value')
  validateValue() {
    if (this.range) {
      checkEmptyOrArrayOf(this, 'value', 'number');
    } else {
      checkEmptyOrType(this, 'value', 'number');
    }
  }

  /**
   * Event dispatched while a thumb is sliding, payload is the current value.
   */
  @Event() postInput: EventEmitter<number | [number, number]>;

  /**
   * Event dispatched when a thumb is released after sliding, payload is the current value.
   */
  @Event() postChange: EventEmitter<number | [number, number]>;

  constructor() {
    this.dragThumb = this.dragThumb.bind(this);
    this.releaseThumb = this.releaseThumb.bind(this);
  }

  componentDidLoad() {
    this.validateMax();
    this.validateMin();
    this.validateOrient();
    this.validateRange();
    this.validateStep();
    this.validateValue();
  }

  private initializeSliderValue() {
    if (this.range && !Array.isArray(this.value)) {
      this.value = [
        this.convertRelativePositionToValue(1 / 3),
        this.convertRelativePositionToValue(2 / 3),
      ];
    } else if (!this.range && typeof this.value !== 'number') {
      this.value = this.convertRelativePositionToValue(0.5);
    }
  }

  private setupThumbDrag(event: PointerEvent) {
    this.activeThumb = new ActiveThumb(event.target, this.host, this.orient);
    this.activeThumb.el.classList.add('active');

    document.addEventListener('pointermove', this.dragThumb);
    document.addEventListener('pointerup', this.releaseThumb);
  }

  private dragThumb(event: PointerEvent) {
    if (!this.activeThumb) return;

    const cursorPosition = this.orient === 'vertical' ? event.clientY : event.clientX;

    const positionBounds = this.activeThumb.positionBounds;
    const clampedPosition = clamp(cursorPosition, positionBounds.min, positionBounds.max);

    const trackLength = this.activeThumb.trackBounds.max - this.activeThumb.trackBounds.min;
    const positionFromStart = clampedPosition - this.activeThumb.trackBounds.min;
    const relativePosition = positionFromStart / trackLength;

    const snappedValue = this.convertRelativePositionToValue(relativePosition);

    if (snappedValue === this.value) return;

    this.updateThumbValue(snappedValue);
  }

  private releaseThumb() {
    if (!this.activeThumb) return;

    document.removeEventListener('pointermove', this.dragThumb);
    document.removeEventListener('pointerup', this.releaseThumb);

    this.activeThumb.el.classList.remove('active');
    this.activeThumb = null;

    this.postChange.emit(this.value);
  }

  private moveThumbWithKeyboard(event: KeyboardEvent) {
    this.activeThumb = new ActiveThumb(event.target, this.host, this.orient);

    const newValue = this.getNewValueFromKey(event.key, this.activeThumb.value);
    if (newValue === undefined) return;

    event.preventDefault();

    const neighborValues = this.activeThumb.neighborValues;
    const minValue = neighborValues.previous ?? this.min;
    const maxValue = neighborValues.next ?? this.max;

    const clampedValue = clamp(newValue, minValue, maxValue);
    this.updateThumbValue(clampedValue);
  }

  private getNewValueFromKey(key: string, currentValue: number): number | undefined {
    const smallStepSize = this.step === 'any' ? 1 : this.step;
    const largeStepSize = Math.max(0.1 * (this.max - this.min), smallStepSize);

    switch (key) {
      case 'ArrowRight':
      case 'ArrowUp':
        return currentValue + smallStepSize;

      case 'ArrowLeft':
      case 'ArrowDown':
        return currentValue - smallStepSize;

      case 'PageUp':
        return this.snapValueToStep(currentValue + largeStepSize);

      case 'PageDown':
        return this.snapValueToStep(currentValue - largeStepSize);

      case 'Home':
        return this.min;

      case 'End':
        return this.max;

      default:
        return undefined;
    }
  }

  private updateThumbValue(value: number) {
    if (!this.activeThumb) throw new Error('No active thumb found.');

    this.activeThumb.setValue(value, this.convertValueToRelativePosition(value));

    if (this.activeThumb.isOnlyThumb) {
      this.value = value;
    } else {
      const thumbIndex = this.activeThumb.isFirstThumb ? 0 : 1;
      this.value[thumbIndex] = value;
    }

    this.postInput.emit(this.value);
  }

  private convertValueToRelativePosition(value: number): number {
    const clampedValue = clamp(value, this.min, this.max);
    const snappedValue = this.snapValueToStep(clampedValue);
    const range = this.max - this.min;
    return (snappedValue - this.min) / range;
  }

  private convertRelativePositionToValue(relativePosition: number): number {
    const range = this.max - this.min;
    const exactValue = this.min + range * relativePosition;
    return this.snapValueToStep(exactValue);
  }

  private snapValueToStep(value: number): number {
    if (this.step === 'any') return value;

    const offsetFromMin = value - this.min;
    const stepsFromMin = Math.round(offsetFromMin / this.step);
    return stepsFromMin * this.step + this.min;
  }

  private renderThumb(aria: { valueMin: number; valueMax: number; valueNow: number }) {
    return (
      <div
        role="slider"
        tabIndex={0}
        aria-valuemin={aria.valueMin}
        aria-valuemax={aria.valueMax}
        aria-valuenow={aria.valueNow}
        onPointerDown={e => this.setupThumbDrag(e)}
        onKeyDown={e => this.moveThumbWithKeyboard(e)}
      ></div>
    );
  }

  render() {
    this.initializeSliderValue();

    const values = Array.isArray(this.value) ? this.value : [this.value];
    const snappedValues = values.map(value => this.snapValueToStep(value));
    const [firstThumbValue, secondThumbValue] = snappedValues;

    const relativePositions = snappedValues.map(value =>
      this.convertValueToRelativePosition(value).toString(),
    );

    const customProperties = { '--post-slider-fill-end': relativePositions.pop() };
    if (relativePositions.length) {
      customProperties['--post-slider-fill-start'] = relativePositions.pop();
    }

    return (
      <Host data-version={version} style={customProperties}>
        {this.renderThumb({
          valueMin: this.min,
          valueMax: secondThumbValue ?? this.max,
          valueNow: firstThumbValue,
        })}

        {!!secondThumbValue &&
          this.renderThumb({
            valueMin: firstThumbValue,
            valueNow: secondThumbValue,
            valueMax: this.max,
          })}
      </Host>
    );
  }
}
