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
    this.hovered = 0;
  }

  private handleHover(hoverCount: number) {
    this.hovered = hoverCount;
  }

  private reset() {
    this.hovered = 0;
  }

  private renderStars() {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled =
        i <= this.rating && (this.hovered === 0 || this.hovered > this.rating) ? true : false;
      const hovered = i <= this.hovered ? true : false;
      stars.push(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          onClick={() => this.handleClick(i)}
          onMouseEnter={() => this.handleHover(i)}
          onMouseLeave={() => this.reset()}
          class="star"
        >
          <path
            d="M24 9.12099L15.6574 7.80063L12 0L8.22857 7.92034L0 9.12009L6.05743 15.2404L4.686 24.0004L12.1149 19.9206L19.5437 24.0004L18.1723 15.2404L24 9.12099Z"
            class={`${filled ? 'active-boarder' : 'default-boarder'}`}
          />
          <path
            d="M12 18.6011L6.05743 21.8412L7.2 14.8812L2.4 9.96073L9.02829 9.00038L12 2.63981L14.9717 9.00038L21.6 9.96073L16.8 14.8812L17.9426 21.8412L12 18.6011Z"
            class={`${filled ? 'active-fill' : 'default-fill'} ${
              hovered ? 'hover-fill' : 'default-fill'
            }`}
          />
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
