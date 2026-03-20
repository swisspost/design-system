import { IS_BROWSER } from './environment';

export function isMotionReduced(): boolean {
  return IS_BROWSER ? globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches : true;
}
