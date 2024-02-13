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
        'star-container': true,
        'active-star': starIndex < this.currentRating,
        'hovered-star':
          (this.hoveredIndex < this.currentRating && starIndex <= this.hoveredIndex) ||
          (starIndex <= this.hoveredIndex && this.currentRating === 0) ||
          (this.hoveredIndex >= starIndex && starIndex >= this.currentRating),
        'was-active-star': starIndex > this.hoveredIndex && starIndex < this.currentRating,
      };
    } else {
      return {
        'star-container': true,
        'active-disabled': starIndex < this.currentRating,
        'default-disabled': starIndex >= this.currentRating,
      };
    }
  }

  private renderStars() {
    const stars = [];
    for (let index = 0; index < this.max; index++) {
      stars.push(
        <div
          class={this.getClasses(index)}
          onClick={() => this.update(index + 1)}
          onMouseEnter={e => this.handleHover(index, e)}
          onMouseLeave={e => this.handleHover(index, e)}
        >
          <post-icon name="2574" class="border"></post-icon>
          <post-icon name="2574" class="fill"></post-icon>
        </div>,
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
