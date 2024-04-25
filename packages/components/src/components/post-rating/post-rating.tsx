import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import { version } from '@/../package.json';

@Component({
  tag: 'post-rating',
  styleUrl: 'post-rating.scss',
  shadow: true,
})
export class PostRating {
  private hasChanged = false;

  @Element() host: HTMLPostRatingElement;

  @State() hoveredIndex: number;

  /**
   * Defines a hidden label for the component.
   */
  @Prop() readonly label: string = 'Rating';

  /**
   * Defines the total amount of stars rendered in the component.
   */
  @Prop() readonly stars: number = 5;

  /**
   * Defines the rating that the component should show.
   */
  @Prop({ mutable: true }) currentRating = 0;

  /**
   * Defines if the component is readonly or not.
   * This usually should be used together with the `currentRating` property.
   */
  @Prop() readonly readonly: boolean = false;

  /**
   * An event emitted whenever the component's value has changed (on input).
   * The event payload can be used like so: `event.detail.value`.
   */
  @Event() postInput: EventEmitter<{ value: number }>;

  /**
   * An event emitted whenever the component's value has changed (on blur).
   * The event payload can be used like so: `event.detail.value`.
   */
  @Event() postChange: EventEmitter<{ value: number }>;

  constructor() {
    this.keydownHandler = this.keydownHandler.bind(this);
    this.blurHandler = this.blurHandler.bind(this);
    this.hoverHandler = this.hoverHandler.bind(this);
  }

  private update(value: number): void {
    if (this.readonly || value < 0 || value > this.stars) return;

    this.currentRating = this.currentRating !== value ? value : 0; // If a star is clicked the second time, the rating gets set to 0.
    this.postInput.emit({ value: this.currentRating });
    this.hasChanged = true;
  }

  private keydownHandler(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowLeft':
        e.preventDefault();
        this.update(this.currentRating - 1);
        break;
      case 'ArrowUp':
      case 'ArrowRight':
        e.preventDefault();
        this.update(this.currentRating + 1);
        break;
      case 'Home':
        e.preventDefault();
        this.update(0);
        break;
      case 'End':
        e.preventDefault();
        this.update(this.stars);
        break;
      case 'Enter':
      case ' ':
        this.blurHandler();
        break;
      default:
        return;
    }
  }

  private blurHandler() {
    if (this.hasChanged) {
      this.postChange.emit({ value: this.currentRating });
      this.hasChanged = false;
    }
  }

  private hoverHandler(index: number, e: MouseEvent) {
    if (this.readonly) return;

    if (e.type === 'mouseenter') {
      this.hoveredIndex = index;
    } else if (e.type === 'mouseleave') {
      this.hoveredIndex = undefined;
    }
  }

  render() {
    return (
      <Host data-version={version}>
        <div
          role="slider"
          class="rating"
          tabindex="0"
          aria-label={this.label}
          aria-valuemin="0"
          aria-valuemax={this.stars}
          aria-valuenow={this.currentRating}
          aria-valuetext={`${this.currentRating} out of ${this.stars}`}
          aria-readonly={this.readonly ? 'true' : 'false'}
          onKeyDown={this.keydownHandler}
          onBlur={this.blurHandler}
        >
          {Array.from({ length: this.stars }).map((v, i: number) => (
            <div
              key={`star-${v}`}
              aria-hidden="true"
              class={{
                'star': true,
                'before-hover': i < this.hoveredIndex,
                'active': i < Math.round(this.currentRating),
                'hover': i === this.hoveredIndex,
                'after-active': i > this.hoveredIndex && i < this.currentRating,
              }}
              onClick={() => this.update(i + 1)}
              onMouseEnter={e => this.hoverHandler(i, e)}
              onMouseLeave={e => this.hoverHandler(i, e)}
            >
              <post-icon name="2062" class="stroke"></post-icon>
              <post-icon name="2574" class="fill"></post-icon>
            </div>
          ))}
        </div>
      </Host>
    );
  }
}
