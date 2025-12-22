/**
 * Used by
 * 1. PostHeader (mobile)
 * 2. PostMegadropdown
 * 3. BackToTopButton
 */

import { AnimationOptions } from './types';
import { resolveEasing } from './utils';

const defaultOptions: AnimationOptions & { translate: number } = {
  duration: 500,
  easing: 'ease',
  fill: 'none',
  translate: -100,
};

type FadeSlideOptions = Partial<AnimationOptions> & { translate?: number };

function animateFadeSlide(
  el: Element,
  keyframes: Keyframe[],
  options: FadeSlideOptions,
): Animation {
  const { duration, easing, fill } = { ...defaultOptions, ...options };
  return el.animate(keyframes, {
    duration,
    easing: resolveEasing(easing),
    fill,
  });
}

export function fadeSlide(
  el: Element,
  direction: 'in' | 'out',
  options: FadeSlideOptions,
): Animation {
  if (!el) return;

  const mergedOptions: AnimationOptions & { translate?: number } = {
    ...defaultOptions,
    ...options,
  };

  const { translate } = mergedOptions;

  const baseKeyframes: Keyframe[] = [
    { opacity: '0', transform: `translateY(${translate}px)` },
    { opacity: '1', transform: 'translateY(0px)' },
  ];

  const keyframes = direction === 'in' ? baseKeyframes : [...baseKeyframes].reverse();

  return animateFadeSlide(el, keyframes, options);
}
