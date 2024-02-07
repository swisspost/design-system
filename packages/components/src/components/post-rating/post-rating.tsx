import { Component, h, Event, EventEmitter, Prop, Host, State, Element } from '@stencil/core';
import { version } from '../../../package.json';

@Component({
  tag: 'post-rating',
  styleUrl: 'post-rating.scss',
  shadow: true,
})
export class PostRating {
  @Element() host: HTMLPostRatingElement;
  /**
   * The current rating value
   */
  @Prop({ mutable: true }) currentRating = 0;

  /**
   * The index of the currently hovered star
   */
  @State() hoveredIndex: number;

  /**
   * The number of stars in the rating
   */
  @Prop() readonly max?: number = 5;

  /**
   * Boolean for the disabled state of the component
   */
  @Prop() readonly disabled?: boolean = false;

  /**
   * If readonly is true, the component only displays a rating and is not interactive.
   */
  @Prop() readonly readonly?: boolean = false;

  // prettier-ignore
  /**
   * Event emitted when the rating gets commited
   */
  @Event({
    eventName: 'ratingChange',
    composed: true,
    bubbles: true,
  }) ratingChange: EventEmitter<number>;

  // prettier-ignore
  /**
   * Event emitted whenever the rating changes
   */
  @Event({
    eventName: 'input',
    composed: true,
    bubbles: true,
  }) input: EventEmitter<number>;

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  private handleKeyDown(ev: KeyboardEvent) {
    switch (ev.key) {
      case 'ArrowDown':
      case 'ArrowLeft':
        ev.preventDefault();
        this.update(this.currentRating - 1);
        break;
      case 'ArrowUp':
      case 'ArrowRight':
        ev.preventDefault();
        this.update(this.currentRating + 1);
        break;
      case 'Home':
        ev.preventDefault();
        this.update(0);
        break;
      case 'End':
        ev.preventDefault();
        this.update(this.max);
        break;
      case 'Enter':
      case ' ':
        this.handleBlur();
        break;
      default:
        return;
    }
  }

  private hasChanged = false;

  private handleBlur() {
    if (this.hasChanged === true) {
      this.ratingChange.emit(this.currentRating);
      console.log('test');
      this.hasChanged = false;
    }
  }

  private handleHover(index: number, e: MouseEvent) {
    if (!this.isInteractive()) return;
    if (e.type === 'mouseenter') {
      this.hoveredIndex = index;
    } else if (e.type === 'mouseleave') {
      this.hoveredIndex = undefined;
    }
  }

  private isInteractive(): boolean {
    return !this.readonly && !this.disabled;
  }

  private update(value: number): void {
    if (!this.isInteractive()) return;
    if (value > this.max || value < 0) return;
    this.currentRating = this.currentRating !== value ? value : 0;
    this.input.emit(this.currentRating);
    this.hasChanged = true;
  }

  private getClasses(starIndex: number) {
    if (!this.disabled) {
      return {
        'star': true,
        'active-star': starIndex < this.currentRating,
        'hovered-star':
          (this.hoveredIndex < this.currentRating && starIndex <= this.hoveredIndex) ||
          (starIndex <= this.hoveredIndex && this.currentRating === 0) ||
          (this.hoveredIndex >= starIndex && starIndex >= this.currentRating),
        'was-active-star': starIndex > this.hoveredIndex && starIndex < this.currentRating,
      };
    } else {
      return {
        'star': true,
        'active-disabled': starIndex < this.currentRating,
        'default-disabled': starIndex >= this.currentRating,
      };
    }
  }

  private renderStars() {
    const stars = [];
    for (let index = 0; index < this.max; index++) {
      stars.push(
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class={this.getClasses(index)}
          onClick={() => this.update(index + 1)}
          onMouseEnter={e => this.handleHover(index, e)}
          onMouseLeave={e => this.handleHover(index, e)}
          cursor={this.isInteractive() ? 'pointer' : 'default'}
        >
          <path d="M15.2047 8.01289L15.3173 8.25303L15.5793 8.29449L22.981 9.46594L17.8102 14.8955L17.6402 15.0741L17.6783 15.3177L18.8923 23.0722L12.3555 19.4823L12.1149 19.3501L11.8742 19.4823L5.3374 23.0722L6.55141 15.3177L6.59048 15.0681L6.4128 14.8886L1.0518 9.47202L8.30071 8.41511L8.56513 8.37655L8.68001 8.1353L11.9965 1.17035L15.2047 8.01289Z" />
        </svg>,
      );
    }
    return stars;
  }

  render() {
    return (
      <Host data-version={version}>
        <div
          role="slider"
          aria-valuemin="0"
          aria-valuemax={this.max}
          aria-valuenow={this.currentRating}
          aria-valuetext={`${this.currentRating} out of ${this.max}`}
          aria-readonly={this.readonly && !this.disabled ? 'true' : 'false'}
          aria-disabled={this.disabled ? 'true' : 'false'}
          class="rating"
          tabindex="0"
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
        >
          {this.renderStars()}
        </div>
      </Host>
    );
  }
}
