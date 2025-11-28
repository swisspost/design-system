const duration = 200;
const fadedOutKeyframe: Keyframe = { opacity: '0' };
const fadedInKeyframe: Keyframe = { opacity: '1' };

export function fadeIn(
  el: Element,
  fadeDuration: number = duration,
  fadeEasing: string = 'linear',
  fadeFill: FillMode = 'forwards',
): Animation {
  if (!el) return;
  return el.animate([fadedOutKeyframe, fadedInKeyframe], {
    duration: fadeDuration,
    easing: fadeEasing,
    fill: fadeFill,
  });
}

export function fadeOut(
  el: Element,
  fadeDuration: number = duration,
  fadeEasing: string = 'linear',
  fadeFill: FillMode = 'forwards',
): Animation {
  if (!el) return;
  return el.animate([fadedInKeyframe, fadedOutKeyframe], {
    duration: fadeDuration,
    easing: fadeEasing,
    fill: fadeFill,
  });
}
