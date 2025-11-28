const easing: string = 'ease';
const duration: number = 500;
const fill: FillMode = 'forwards';

export function slideUp(
  el: HTMLElement,
  translateSize: string = '-100%',
  slideDuration: number = duration,
  slideEasing: string = easing,
  slideFill: FillMode = fill,
): Animation {
  return el.animate(
    [
      { transform: 'translateY(0)' }, // Starting position (no translation)
      { transform: `translateY(${translateSize})` }, // End position
    ],
    {
      duration: slideDuration,
      easing: slideEasing,
      fill: slideFill,
    },
  );
}

export function slideDown(
  el: HTMLElement,
  translateSize: string = '-100%',
  slideDuration: number = duration,
  slideEasing: string = easing,
  slideFill: FillMode = fill,
): Animation {
  return el.animate(
    [
      { transform: `translateY(${translateSize})` }, // Starting position (no translation)
      { transform: 'translateY(0)' }, // End position
    ],
    {
      duration: slideDuration,
      easing: slideEasing,
      fill: slideFill,
    },
  );
}

export function slideIn(
  el: HTMLElement,
  translateSize: string = '-100%',
  slideDuration: number = duration,
  slideEasing: string = easing,
  slideFill: FillMode = fill,
): Animation {
  return el.animate(
    [
      { transform: `translateX(${translateSize})` }, // Starting position
      { transform: 'translateX(0)' }, // End position
    ],
    {
      duration: slideDuration,
      easing: slideEasing,
      fill: slideFill,
    },
  );
}

export function slideOut(
  el: HTMLElement,
  translateSize: string = '-100%',
  slideDuration: number = duration,
  slideEasing: string = easing,
  slideFill: FillMode = fill,
): Animation {
  return el.animate(
    [
      { transform: 'translateX(0)' }, // Starting position
      { transform: `translateX(${translateSize})` }, // End position
    ],
    {
      duration: slideDuration,
      easing: slideEasing,
      fill: slideFill,
    },
  );
}
