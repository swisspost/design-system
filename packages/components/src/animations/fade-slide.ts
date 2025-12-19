/**
 * Used by
 * 1. PostHeader (mobile)
 * 2. PostMegadropdown
 * 3. BackToTopButton
 */

import { AnimationOptions } from './types';
import { resolveEasing } from './utils';

const defaultOptions: Partial<AnimationOptions> = {
  translate: -100,
  duration: 500,
  easing: 'ease',
  fill: 'none',
};

function animateFadeSlide(
  el: Element,
  keyframes: Keyframe[],
  options: Partial<AnimationOptions> = {},
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
  options: Partial<AnimationOptions> = {},
): Animation {
  if (!el) return;

  const { translate = defaultOptions.translate } = options;

  const baseKeyframes: Keyframe[] = [
    { opacity: '0', transform: `translateY(${translate}px)` },
    { opacity: '1', transform: 'translateY(0px)' },
  ];

  const keyframes = direction === 'in' ? baseKeyframes : [...baseKeyframes].reverse();

  return animateFadeSlide(el, keyframes, options);
}
