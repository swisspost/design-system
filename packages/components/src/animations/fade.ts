const fadedOutKeyframe: Keyframe = { opacity: '0' };
const fadedInKeyframe: Keyframe = { opacity: '1' };

export function fadeIn(el: Element, fadeDuration:number = 200, fadeEasing:string='linear'): Animation {
  if (!el) return;
  return el.animate([fadedOutKeyframe, fadedInKeyframe], { duration: fadeDuration, easing:fadeEasing, fill: 'forwards'  });
}

export function fadeOut(el: Element, fadeDuration:number = 200, fadeEasing:string ='linear'): Animation {
  if (!el) return;
  return el.animate([fadedInKeyframe, fadedOutKeyframe], { duration: fadeDuration,  easing:fadeEasing, fill: 'forwards'  });
}
