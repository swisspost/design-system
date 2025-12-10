/**
 * Used by:
 * 1. PostTabs (with default parameters)
 * 2. PostHeader and PostMegadropdown (with custom parameters defined within the components)
 */

type CurveEasing = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type PresetEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

const defaultDuration = 200;
const defaultSlidePx = 10;
const defaultEasing: PresetEasing = 'linear';

function resolveEasing(easing: CurveEasing | PresetEasing): string {
  if (typeof easing === 'string') return easing;
  const { x1, y1, x2, y2 } = easing;
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
}

export function fadeIn(
  el: Element,
  slideDownPx: number = defaultSlidePx,
  fadeDuration: number = defaultDuration,
  fadeEasing: CurveEasing | PresetEasing = defaultEasing,
  fadeFill: FillMode = 'forwards',
): Animation {
  if (!el) return;

  const fadedOut: Keyframe = {
    opacity: '0',
    transform: `translateY(-${slideDownPx}px)`,
  };

  const fadedIn: Keyframe = {
    opacity: '1',
    transform: 'translateY(0px)',
  };

  return el.animate([fadedOut, fadedIn], {
    duration: fadeDuration,
    easing: resolveEasing(fadeEasing),
    fill: fadeFill,
  });
}

export function fadeOut(
  el: Element,
  slideUpPx: number = defaultSlidePx,
  fadeDuration: number = defaultDuration,
  fadeEasing: CurveEasing | PresetEasing = defaultEasing,
  fadeFill: FillMode = 'forwards',
): Animation {
  if (!el) return;

  const fadedIn: Keyframe = {
    opacity: '1',
    transform: 'translateY(0px)',
  };

  const fadedOut: Keyframe = {
    opacity: '0',
    transform: `translateY(-${slideUpPx}px)`,
  };

  return el.animate([fadedIn, fadedOut], {
    duration: fadeDuration,
    easing: resolveEasing(fadeEasing),
    fill: fadeFill,
  });
}
