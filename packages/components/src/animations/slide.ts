/**
 * Used by PostMegadropdown
 */

import { SlideOptions } from './types';

// Global defaults
const defaultSlideOptions: SlideOptions = {
  translateX: 100,
  duration: 500,
  easing: 'ease',
  fill: 'forwards',
};

export function slideIn(el: HTMLElement, options: SlideOptions = {}): Animation {
  const { translateX, duration, easing, fill } = {
    ...defaultSlideOptions,
    ...options,
  };

  return el.animate([{ transform: `translateX(${translateX}%)` }, { transform: 'translateX(0)' }], {
    duration,
    easing,
    fill,
  });
}

export function slideOut(el: HTMLElement, options: SlideOptions = {}): Animation {
  const { translateX, duration, easing, fill } = {
    ...defaultSlideOptions,
    ...options,
  };

  return el.animate([{ transform: 'translateX(0)' }, { transform: `translateX(${translateX}%)` }], {
    duration,
    easing,
    fill,
  });
}
