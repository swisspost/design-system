/**
 * Used by PostMegadropdown
 */

import { AnimationOptions } from './types';
import { resolveEasing } from './utils';

const defaultSlideOptions: Partial<AnimationOptions> = {
  translate: 100,
  duration: 500,
  easing: 'ease',
  fill: 'forwards',
};

function animateSlide(el: HTMLElement, keyframes: Keyframe[], options: Partial<AnimationOptions>) {
  const { duration, easing, fill } = { ...defaultSlideOptions, ...options };
  return el.animate(keyframes, { duration, easing: resolveEasing(easing), fill });
}

export function slide(
  el: HTMLElement,
  direction: 'in' | 'out',
  options: Partial<AnimationOptions> = {},
): Animation {
  const { translate = defaultSlideOptions.translate } = options;

  const keyframes: Keyframe[] =
    direction === 'in'
      ? [{ transform: `translateX(${translate}%)` }, { transform: 'translateX(0)' }]
      : [{ transform: 'translateX(0)' }, { transform: `translateX(${translate}%)` }];

  return animateSlide(el, keyframes, options);
}
