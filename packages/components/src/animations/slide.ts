/**
 * Used by PostMegadropdown
 */

import { AnimationOptions } from './types';
import { resolveEasing } from './fade-slide';

const defaultSlideOptions: AnimationOptions = {
  translate: 100,
  duration: 500,
  easing: 'ease',
  fill: 'forwards',
};

function animateSlide(el: HTMLElement, keyframes: Keyframe[], options: AnimationOptions) {
  const { duration, easing, fill } = { ...defaultSlideOptions, ...options };
  return el.animate(keyframes, { duration, easing: resolveEasing(easing), fill });
}

export function slideIn(el: HTMLElement, options: AnimationOptions = {}): Animation {
  const { translate = defaultSlideOptions.translate } = options;
  return animateSlide(
    el,
    [{ transform: `translateX(${translate}%)` }, { transform: 'translateX(0)' }],
    options,
  );
}

export function slideOut(el: HTMLElement, options: AnimationOptions = {}): Animation {
  const { translate = defaultSlideOptions.translate } = options;
  return animateSlide(
    el,
    [{ transform: 'translateX(0)' }, { transform: `translateX(${translate}%)` }],
    options,
  );
}
