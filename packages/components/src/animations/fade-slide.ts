/**
 * Used by
 * 1. PostHeader (mobile)
 * 2. PostMegadropdown
 */

type CurveEasing = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type PresetEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

const defaultDuration = 200;
const defaultSlidePx = -10;
const defaultEasing: PresetEasing = 'linear';

function resolveEasing(easing: CurveEasing | PresetEasing): string {
  if (typeof easing === 'string') return easing;
  const { x1, y1, x2, y2 } = easing;
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
}

export function fadeSlideIn(
  el: Element,
  slideFromPx: number = defaultSlidePx,
  fadeDuration: number = defaultDuration,
  fadeEasing: CurveEasing | PresetEasing = defaultEasing,
  fadeFill: FillMode = 'forwards',
): Animation {
  if (!el) return;

  const start: Keyframe = {
    opacity: '0',
    transform: `translateY(${slideFromPx}px)`,
  };

  const end: Keyframe = {
    opacity: '1',
    transform: 'translateY(0px)',
  };

  return el.animate([start, end], {
    duration: fadeDuration,
    easing: resolveEasing(fadeEasing),
    fill: fadeFill,
  });
}

export function fadeSlideOut(
  el: Element,
  slideFromPx: number = defaultSlidePx,
  fadeDuration: number = defaultDuration,
  fadeEasing: CurveEasing | PresetEasing = defaultEasing,
  fadeFill: FillMode = 'forwards',
): Animation {
  if (!el) return;

  const start: Keyframe = {
    opacity: '1',
    transform: 'translateY(0)',
  };

  const end: Keyframe = {
    opacity: '0',
    transform: `translateY(${slideFromPx}px)`,
  };

  return el.animate([start, end], {
    duration: fadeDuration,
    easing: resolveEasing(fadeEasing),
    fill: fadeFill,
  });
}
