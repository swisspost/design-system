// Define common animation options
const easing: string = 'ease';
const defaultDuration: number = 500;
const fill: FillMode = 'forwards';

function createSlideFadeAnimation(
  el: HTMLElement,
  keyframes: Keyframe[],
  duration = defaultDuration,
): Animation {
  return el.animate(keyframes, {
    duration: duration,
    easing,
    fill,
  });
}

export function slideUpAndFadeOut(
  el: HTMLElement,
  translateY: string = '-100%',
  duration = defaultDuration,
): Animation {
  const keyframes: Keyframe[] = [
    { transform: 'translateY(0)', opacity: '1' },
    { transform: `translateY(${translateY})`, opacity: '0' },
  ];
  return createSlideFadeAnimation(el, keyframes, duration);
}

export function slideDownAndFadeIn(
  el: HTMLElement,
  translateY: string = '-100%',
  duration = defaultDuration,
): Animation {
  const keyframes: Keyframe[] = [
    { transform: `translateY(${translateY})`, opacity: '0' },
    { transform: 'translateY(0)', opacity: '1' },
  ];
  return createSlideFadeAnimation(el, keyframes, duration);
}
