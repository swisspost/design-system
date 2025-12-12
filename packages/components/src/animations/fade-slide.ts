/**
 * Used by
 * 1. PostHeader (mobile)
 * 2. PostMegadropdown
 */

import { CurveEasing, PresetEasing, AnimationOptions } from './types';

const defaultOptions: AnimationOptions = {
  translate: -10,
  duration: 300,
  easing: 'linear',
  fill: 'forwards',
};

export function resolveEasing(easing: CurveEasing | PresetEasing): string {
  if (typeof easing === 'string') return easing;
  const { x1, y1, x2, y2 } = easing;
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
}

function animateFadeSlide(
  el: Element,
  keyframes: Keyframe[],
  options: AnimationOptions = {},
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
  options: AnimationOptions = {},
): Animation {
  if (!el) return;

  const { translate = defaultOptions.translate } = options;

  const keyframes: Keyframe[] =
    direction === 'in'
      ? [
        { opacity: '0', transform: `translateY(${translate}px)` },
        { opacity: '1', transform: 'translateY(0px)' },
      ]
      : [
        { opacity: '1', transform: 'translateY(0px)' },
        { opacity: '0', transform: `translateY(${translate}px)` },
      ];

  return animateFadeSlide(el, keyframes, options);
}
