const easing: string = 'ease';
const duration: number = 500;
const fill: FillMode = 'forwards';

export const slideUp = (el: HTMLElement, translateSize: string = '8rem'): Animation => {
  return el.animate(
    [
      { transform: `translateY(-${translateSize})` }, // Starting position (no translation)
      { transform: 'translateY(0)' }, // End position
    ],
    {
      duration: duration,
      easing,
      fill,
    },
  );
};

export const slideDown = (el: HTMLElement, translateSize: string = '8rem'): Animation => {
  return el.animate(
    [
      { transform: 'translateY(0)' }, // Starting position (no translation)
      { transform: `translateY(-${translateSize})` }, // End position
    ],
    {
      duration: duration,
      easing,
      fill,
    },
  );
};
