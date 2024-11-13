const fadeDuration = 200;
const fadedOutKeyframe: Keyframe = {opacity: '0'};
const fadedInKeyframe: Keyframe = {opacity: '1'};

export const fadeIn = (el: Element): Animation => el.animate(
  [ fadedOutKeyframe, fadedInKeyframe ],
  { duration: fadeDuration }
);

export const fadeOut = (el: Element): Animation => el.animate(
  [ fadedInKeyframe, fadedOutKeyframe ],
  { duration: fadeDuration }
);
