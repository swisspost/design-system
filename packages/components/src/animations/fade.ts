const fadeDuration = 200;
const fadedOutKeyFrame = {opacity: '0'};
const fadedInKeyFrame = {opacity: '1'};

export const fadeIn = (el: Element): Animation => el.animate(
  [ fadedOutKeyFrame, fadedInKeyFrame ],
  { duration: fadeDuration }
);

export const fadeOut = (el: Element): Animation => el.animate(
  [ fadedInKeyFrame, fadedOutKeyFrame ],
  { duration: fadeDuration }
);
