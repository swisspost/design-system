import { Orientation } from '@root/src';

interface Bounds {
  min: number;
  max: number;
}

interface Neighbors {
  previous: HTMLElement | null;
  next: HTMLElement | null;
}

function isThumb(node: Node | EventTarget): node is HTMLElement {
  return node instanceof HTMLElement && node.matches('[role="slider"]');
}

function getValueNow(thumb: HTMLElement): number {
  return parseFloat(thumb.getAttribute('aria-valuenow'));
}

export class ActiveThumb {
  el: HTMLElement;
  neighbors: Neighbors;
  positionBounds: Bounds;
  trackBounds: Bounds;

  private track: HTMLElement;
  private relativePosition = 0;
  private isPositionUpdating = false;

  get isOnlyThumb(): boolean {
    return !this.neighbors.previous && !this.neighbors.next;
  }

  get isFirstThumb(): boolean {
    return !this.isOnlyThumb && !this.neighbors.previous;
  }

  get value(): number {
    return getValueNow(this.el);
  }

  get neighborValues(): { previous: number | null; next: number | null } {
    const previousValue = this.neighbors.previous ? getValueNow(this.neighbors.previous) : null;
    const nextValue = this.neighbors.next ? getValueNow(this.neighbors.next) : null;
    return { previous: previousValue, next: nextValue };
  }

  constructor(node: Node | EventTarget, track: HTMLElement, orientation: Orientation) {
    if (!isThumb(node)) throw Error('An active thumb must be an HTML element with a slider role.');

    this.el = node;
    this.neighbors = {
      previous: isThumb(this.el.previousSibling) ? this.el.previousSibling : null,
      next: isThumb(this.el.nextSibling) ? this.el.nextSibling : null,
    };

    this.track = track;
    this.trackBounds = this.getTrackBounds(track, orientation);

    const minBound = this.neighbors.previous
      ? this.getOffset(this.neighbors.previous, orientation)
      : this.trackBounds.min;
    const maxBound = this.neighbors.next
      ? this.getOffset(this.neighbors.next, orientation)
      : this.trackBounds.max;
    this.positionBounds = { min: minBound, max: maxBound };

    this.updatePosition = this.updatePosition.bind(this);
  }

  private getTrackBounds(track: HTMLElement, orientation: Orientation): Bounds {
    const rect = track.getBoundingClientRect();
    return orientation === 'vertical'
      ? { min: rect.top, max: rect.bottom }
      : { min: rect.left, max: rect.right };
  }

  private getOffset(el: HTMLElement, orientation: Orientation): number {
    const rect = el.getBoundingClientRect();
    return orientation === 'vertical' ? rect.top + rect.height / 2 : rect.left + rect.width / 2;
  }

  private updatePosition() {
    this.isPositionUpdating = true;

    const cssProperty = this.isFirstThumb ? '--post-slider-fill-start' : '--post-slider-fill-end';
    this.track.style.setProperty(cssProperty, this.relativePosition.toString());

    requestAnimationFrame(this.updatePosition);
  }

  setValue(value: number, relativePosition: number) {
    this.el.setAttribute('aria-valuenow', value.toString());
    this.neighbors.previous?.setAttribute('aria-valuemax', value.toString());
    this.neighbors.next?.setAttribute('aria-valuemin', value.toString());

    // updating position depending on the animation frame rate
    this.relativePosition = relativePosition;
    if (!this.isPositionUpdating) this.updatePosition();
  }
}
