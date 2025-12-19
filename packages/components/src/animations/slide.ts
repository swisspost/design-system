/**
 * Used by PostMegadropdown
 */

import { AnimationOptions } from './types';
import { resolveEasing } from './utils';

const defaultSlideOptions: Partial<AnimationOptions> = {
  translate: 100,
  duration: 500,
  easing: 'ease',
  fill: 'none',
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

  const baseKeyframes: Keyframe[] = [
    { transform: `translateX(${translate}%)` },
    { transform: 'translateX(0)' },
  ];

  const keyframes = direction === 'in' ? baseKeyframes : [...baseKeyframes].reverse();

  return animateSlide(el, keyframes, options);
}
