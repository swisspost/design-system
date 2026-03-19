import { CurveEasing, PresetEasing, PRESET_MAP } from './types';

export function resolveEasing(easing: CurveEasing | PresetEasing | 'customEase'): string {
  const e = typeof easing === 'string' ? (PRESET_MAP[easing] ?? easing) : easing;
  if (typeof e === 'string') return e;
  const { x1, y1, x2, y2 } = e;

  return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
}
