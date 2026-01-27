export const ANIMATION_KEYS: string[] = [
  'cylon',
  'cylon-vertical',
  'spin',
  'spin-reverse',
  'fade',
  'throb',
];

export type PostIconAnimation = (typeof ANIMATION_KEYS)[number];
