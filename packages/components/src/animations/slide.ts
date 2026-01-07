/**
 * Used by PostMegadropdown (burger menu)
 */

import { AnimationOptions } from './types';
import { resolveEasing } from './utils';

const defaultOptions: AnimationOptions & { translate: number } = {
  translate: 100,
  duration: 500,
  easing: 'ease',
  fill: 'none',
};

type SlideOptions = Partial<AnimationOptions> & { translate?: number };

function animateSlide(el: HTMLElement, keyframes: Keyframe[], options: Partial<AnimationOptions>) {
  const { duration, easing, fill } = { ...defaultOptions, ...options };
  return el.animate(keyframes, { duration, easing: resolveEasing(easing), fill });
}

export function slide(
  el: HTMLElement,
  direction: 'in' | 'out',
  options: SlideOptions = {},
): Animation {
  const mergedOptions: AnimationOptions & { translate?: number } = {
    ...defaultOptions,
    ...options,
  };

  const { translate } = mergedOptions;

  const baseKeyframes: Keyframe[] = [
    { transform: `translateX(${translate}%)` },
    { transform: 'translateX(0)' },
  ];

  const keyframes = direction === 'in' ? baseKeyframes : [...baseKeyframes].reverse();

  return animateSlide(el, keyframes, options);
}
