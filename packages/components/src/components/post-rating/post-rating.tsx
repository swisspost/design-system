import { Component, h, Event, EventEmitter, Prop, Host } from '@stencil/core';
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
  @Prop({ mutable: true }) rating: number;

  /**
   * The index of the currently hovered star
   */
  @Prop({ mutable: true }) hovered: number;

  /**
   * The number of stars in the rating
   */
  @Prop() readonly ratingSize?: number = 5;

  /**
   * Event emitted when the rating changes
   */
  @Event() ratingChanged: EventEmitter<number>;

  private handleClick(starIndex: number) {
    if (this.rating === starIndex) {
      this.rating = undefined;
    } else {
      this.rating = starIndex;
    }
    this.ratingChanged.emit(this.rating);
    this.hovered = undefined;
  }

  private handleHover(hoverCount: number) {
    this.hovered = hoverCount;
  }

  private reset() {
    this.hovered = undefined;
  }

  private renderStars() {
    const stars = [];
    for (let i = 1; i <= this.ratingSize; i++) {
      const active = i <= this.rating ? true : false;
      const hovered =
        this.hovered === i ||
        (this.hovered >= i && i > this.rating) ||
        (i <= this.hovered && this.rating === undefined)
          ? true
          : false;
      const wasActive =
        i > this.hovered && i <= this.rating && this.hovered !== undefined ? true : false;
      stars.push(
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class={`star ${active ? 'active-star' : ''} ${hovered ? 'hovered-star' : ''} ${
            wasActive ? 'was-active-star' : ''
          }`}
          onClick={() => this.handleClick(i)}
          onMouseEnter={() => this.handleHover(i)}
          onMouseLeave={() => this.reset()}
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
        <div class="rating">{this.renderStars()}</div>
      </Host>
    );
  }
}
