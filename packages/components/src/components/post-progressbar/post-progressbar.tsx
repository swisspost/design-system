import { GreaterThan, LessThan, Type } from '@/utils';
import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'post-progressbar',
  styleUrl: 'post-progressbar.scss',
  shadow: true,
})
export class PostProgressbar {
  @Element() declare host: HTMLPostProgressbarElement;

  /**
   * The minimum value of the progress bar.
   * Must be a valid floating point number less than max.
   */
  @Prop()
  @Type('number')
  min: number = 0;

  /**
   * Describes how much work the task indicated by the progress element requires.
   * Must be a valid floating point number greater than min.
   */
  @Prop()
  @Type('number')
  @GreaterThan('min')
  max: number = 100;

  /**
   * Specifies how much of the task has been completed.
   * Must be a valid floating point number between min and max.
   * If there is no value attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take.
   */
  @Prop()
  @Type('number')
  @GreaterThan('min')
  @LessThan('max')
  value?: number;

  private getEffectiveMin() {
    return Number.isFinite(this.min) ? this.min : 0;
  }

  private getEffectiveMax() {
    return Number.isFinite(this.max) && this.max > this.getEffectiveMin() ? this.max : 100;
  }

  private getEffectiveValue(min: number, max: number) {
    if (
      this.value === undefined ||
      !Number.isFinite(this.value) ||
      this.value < min ||
      this.value > max
    ) {
      return min;
    }

    return this.value;
  }

  render() {
    const min = this.getEffectiveMin();
    const max = this.getEffectiveMax();
    const value = this.getEffectiveValue(min, max);
    const percentage = ((value - min) / (max - min)) * 100;

    return (
      <Host role="progressbar" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}>
        <div class="progress-value" style={{ '--post-progressbar-value': `${percentage}%` }}></div>
      </Host>
    );
  }
}
