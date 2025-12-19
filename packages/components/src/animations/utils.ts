import { CurveEasing, PresetEasing } from './types';

export function resolveEasing(easing: CurveEasing | PresetEasing): string {
  if (typeof easing === 'string') return easing;
  const { x1, y1, x2, y2 } = easing;
  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
}
