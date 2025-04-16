const fadeDuration = 200;
const fadedOutKeyframe: Keyframe = { opacity: '0' };
const fadedInKeyframe: Keyframe = { opacity: '1' };

export function fadeIn(el: Element): Animation {
  return el.animate([fadedOutKeyframe, fadedInKeyframe], { duration: fadeDuration });
}

export function fadeOut(el: Element): Animation {
  return el.animate([fadedInKeyframe, fadedOutKeyframe], { duration: fadeDuration });
}
