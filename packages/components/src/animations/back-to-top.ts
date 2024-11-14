export const showUp = (
  el: HTMLElement,
  translateSize: string = '8rem',
  easing: string = 'ease',
  duration: number = 500,
  fill = 'forwards' as FillMode,
): Animation => {
  return el.animate(
    [
      { transform: `translateY(${translateSize})`, opacity: '0%' },
      { transform: 'translateY(0)', opacity: '100%' },
    ],
    { duration: duration, easing, fill: fill },
  );
};

export const hideDown = (
  el: HTMLElement,
  translateSize: string = '8rem',
  easing: string = 'ease',
  duration: number = 500,
  fill = 'forwards' as FillMode,
): Animation => {
  return el.animate(
    [
      { transform: 'translateY(0)', opacity: '100%' },
      { transform: `translateY(${translateSize})`, opacity: '0%' },
    ],
    { duration: duration, easing, fill: fill },
  );
};
