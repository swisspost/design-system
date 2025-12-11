/**
 * Used by
 * 1. PostHeader (mobile)
 * 2. PostMegadropdown
 */

import { CurveEasing, PresetEasing, FadeSlideOptions } from './types';

const defaultOptions: FadeSlideOptions = {
  translateY: -10,
  duration: 300,
  easing: 'linear',
  fill: 'forwards',
};

function resolveEasing(easing: CurveEasing | PresetEasing): string {
  if (typeof easing === 'string') return easing;
  const { x1, y1, x2, y2 } = easing;
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
}

export function fadeSlideIn(el: Element, options: FadeSlideOptions = {}): Animation {
  if (!el) return;

  const { translateY, duration, easing, fill } = {
    ...defaultOptions,
    ...options,
  };

  return el.animate(
    [
      {
        opacity: '0',
        transform: `translateY(${translateY}px)`,
      },
      {
        opacity: '1',
        transform: 'translateY(0px)',
      },
    ],
    {
      duration: duration,
      easing: resolveEasing(easing),
      fill: fill,
    },
  );
}

export function fadeSlideOut(el: Element, options: FadeSlideOptions): Animation {
  if (!el) return;

  const { translateY, duration, easing, fill } = {
    ...defaultOptions,
    ...options,
  };

  return el.animate(
    [
      {
        opacity: '1',
        transform: 'translateY(0)',
      },
      {
        opacity: '0',
        transform: `translateY(${translateY}px)`,
      },
    ],
    {
      duration: duration,
      easing: resolveEasing(easing),
      fill: fill,
    },
  );
}
