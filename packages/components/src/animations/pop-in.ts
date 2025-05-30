const DEFAULT_DURATION = 250;
const DEFAULT_EASING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const FILL_MODE = 'forwards';

export function popInAnimation(el: Element, duration = DEFAULT_DURATION, easing = DEFAULT_EASING) {
  if (!el) return;

  return el.animate(
    [
      { transform: 'scale(0.9)', opacity: 0 },
      { transform: 'scale(1)', opacity: 1 },
    ],
    {
      duration,
      easing,
      fill: FILL_MODE,
    },
  );
}
