/**
 * Used by
 * 1. PostHeader (mobile)
 * 2. PostMegadropdown
 * 3. BackToTopButton
 */

import { AnimationOptions } from './types';
import { resolveEasing } from './utils';

export type FadeSlideOptions = AnimationOptions & { translate: number };

const defaultOptions: FadeSlideOptions = {
  duration: 500,
  easing: 'ease',
  fill: 'none',
  translate: -100,
};

function animateFadeSlide(
  el: Element,
  keyframes: Keyframe[],
  options: Partial<FadeSlideOptions>,
): Animation {
  const { duration, easing, fill }: FadeSlideOptions = { ...defaultOptions, ...options };
  return el.animate(keyframes, {
    duration,
    easing: resolveEasing(easing),
    fill,
  });
}

export function fadeSlide(
  el: Element,
  direction: 'in' | 'out',
  options: Partial<FadeSlideOptions>,
): Animation {
  if (!el) return;

  const mergedOptions: Partial<FadeSlideOptions> = options;

  const { translate } = mergedOptions;

  const baseKeyframes: Keyframe[] = [
    { opacity: '0', transform: `translateY(${translate}px)` },
    { opacity: '1', transform: 'translateY(0px)' },
  ];

  const keyframes = direction === 'in' ? baseKeyframes : [...baseKeyframes].reverse();

  return animateFadeSlide(el, keyframes, options);
}
