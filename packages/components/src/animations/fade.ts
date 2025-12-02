const defaultDuration = 200;

export function fadeIn(
  el: Element,
  slideDownPx: number = 10,
  fadeDuration: number = defaultDuration,
  fadeEasing: { x1?: number; y1?: number; x2?: number; y2?: number } = {},
  fadeFill: FillMode = 'forwards',
): Animation {
  if (!el) return;

  const { x1 = 0, y1 = 0, x2 = 1, y2 = 1 } = fadeEasing;

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
    easing: `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`,
    fill: fadeFill,
  });
}

export function fadeOut(
  el: Element,
  slideUpPx: number = 10,
  fadeDuration: number = defaultDuration,
  fadeEasing: { x1?: number; y1?: number; x2?: number; y2?: number } = {},
  fadeFill: FillMode = 'forwards',
): Animation {
  if (!el) return;

  const { x1 = 0, y1 = 0, x2 = 1, y2 = 1 } = fadeEasing;

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
    easing: `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`,
    fill: fadeFill,
  });
}
