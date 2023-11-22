import { Component, h, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
  tag: 'post-rating',
  styleUrl: 'post-rating.scss',
  shadow: true,
})
export class PostRating {
  /**
   * The current rating value
   */
  @Prop({ mutable: true }) rating = 0;

  /**
   * The index of the currently hovered star
   */
  @Prop({ mutable: true }) hovered = 0;

  /**
   * Event emitted when the rating changes
   */
  @Event() ratingChanged: EventEmitter<number>;

  private handleClick(starValue: number) {
    this.rating = starValue;
    this.ratingChanged.emit(this.rating);
  }

  private handleHover(hoverCount: number) {
    this.hovered = hoverCount;
  }

  private reset() {
    this.hovered = 0;
  }

  private renderStars() {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      const filled = i <= this.rating ? 'filled' : '';
      const hovered = i <= this.hovered ? 'hovered' : '';
      stars.push(
        <span
          class={`star ${filled} ${hovered}`}
          onClick={() => this.handleClick(i)}
          onMouseEnter={() => this.handleHover(i)}
          onMouseLeave={() => this.reset()}
        >
          ★
        </span>,
      );
    }
    return stars;
  }

  render() {
    return <div class="rating">{this.renderStars()}</div>;
  }
}
