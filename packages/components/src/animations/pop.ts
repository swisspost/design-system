const duration = 250;
const easing = 'ease-out';

export function popIn(el: Element) {
  if (!el) return;

  return el.animate(
    [
      { transform: 'scale(0.9)', opacity: 0 },
      { transform: 'scale(1)', opacity: 1 },
    ],
    {
      duration,
      easing,
      fill: 'forwards',
    },
  );
}

export function popOut(el: Element) {
  if (!el) return;

  return el.animate(
    [
      { transform: 'scale(1)', opacity: 1 },
      { transform: 'scale(0.9)', opacity: 0 },
    ],
    {
      duration,
      easing,
      fill: 'none',
    },
  );
}
