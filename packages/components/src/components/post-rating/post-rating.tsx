import { Component, h, Event, EventEmitter, Prop, Host, State } from '@stencil/core';
import { version } from '../../../package.json';

@Component({
  tag: 'post-rating',
  styleUrl: 'post-rating.scss',
  shadow: true,
})
export class PostRating {
  /**
   * The current rating value
   */
  @Prop({ mutable: true }) currentRating: number;

  /**
   * The index of the currently hovered star
   */
  @State() hovered: number;

  /**
   * The number of stars in the rating
   */
  @Prop() readonly max?: number = 10;

  /**
   * The number of stars in the rating
   */
  @Prop() readonly disabled?: boolean = false;

  /**
   * The number of stars in the rating
   */
  @Prop() readonly readonly?: boolean = false;

  // prettier-ignore
  /**
   * Event emitted when the rating changes
   */
  @Event({
    eventName: 'ratingChanged',
    composed: true,
    bubbles: true,
  }) ratingChanged: EventEmitter<number>;

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  private handleClick(starIndex: number) {
    if (!this.disabled) {
      if (this.currentRating === starIndex) {
        this.currentRating = undefined;
      } else {
        this.currentRating = starIndex;
      }
      this.ratingChanged.emit(this.currentRating);
      this.hovered = undefined;
    }
  }

  @State() counter = 0;

  private handleKeyDown(ev: KeyboardEvent) {
    if (ev.key !== 'Enter' && ev.key !== ' ') {
      if (this.counter === 0) {
        this.hovered = this.currentRating;
      }
      this.counter++;
    }
    switch (ev.key) {
      case 'ArrowDown':
      case 'ArrowLeft':
        if (this.hovered > 0) {
          this.hovered--;
        }
        break;
      case 'ArrowUp':
      case 'ArrowRight':
        if (this.hovered < this.max) {
          this.hovered++;
        }
        break;
      case 'Home':
        this.hovered = 0;
        break;
      case 'End':
        this.hovered = this.max;
        break;
      case 'Enter':
      case ' ':
        ev.preventDefault();
        if (this.counter !== 0) {
          this.currentRating = this.hovered;
          this.ratingChanged.emit(this.currentRating);
          this.counter = 0;
          this.hovered = undefined;
        }
        break;
      default:
        return;
    }
  }

  private handleHover(hoverCount: number) {
    this.hovered = hoverCount;
  }

  private reset() {
    this.hovered = undefined;
  }

  private isInteractive(): boolean {
    return !this.readonly && !this.disabled;
  }

  private getClasses(i: number) {
    const classes = ['star'];
    if (!this.disabled) {
      if (i <= this.currentRating) {
        classes.push('active-star');
      }
      if (
        this.hovered === i ||
        (this.hovered >= i && i > this.currentRating) ||
        (i <= this.hovered && this.currentRating === undefined)
      ) {
        classes.push('hovered-star');
      }
      if (i > this.hovered && i <= this.currentRating && this.hovered !== undefined) {
        classes.push('was-active-star');
      }
    } else if (i <= this.currentRating) {
      classes.push('active-disabled');
    } else {
      classes.push('default-disabled');
    }
    return classes;
  }

  private renderStars() {
    const stars = [];
    for (let i = 1; i <= this.max; i++) {
      stars.push(
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class={`${this.getClasses(i).join(' ')}`}
          onClick={this.isInteractive() && (() => this.handleClick(i))}
          onMouseEnter={this.isInteractive() && (() => this.handleHover(i))}
          onMouseLeave={this.isInteractive() && (() => this.reset())}
          cursor={this.isInteractive() && 'pointer'}
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
          tabindex={0}
          onKeyDown={this.handleKeyDown}
        >
          {this.renderStars()}
        </div>
      </Host>
    );
  }
}
