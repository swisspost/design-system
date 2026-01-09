import { resolveEasing } from './utils';
import { AnimationOptions } from './types';

const defaultOptions: AnimationOptions = {
  duration: 200,
  easing: 'linear',
  fill: 'forwards',
};

function animateFade(
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

export function fade(
  el: Element,
  direction: 'in' | 'out',
  options: Partial<AnimationOptions> = {},
): Animation {
  if (!el) return;

  const baseKeyframes: Keyframe[] = [{ opacity: '0' }, { opacity: '1' }];
  const keyframes = direction === 'in' ? baseKeyframes : [...baseKeyframes].reverse();
  return animateFade(el, keyframes, options);
}
