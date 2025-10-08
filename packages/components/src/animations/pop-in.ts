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
