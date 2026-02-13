import { IS_BROWSER } from './is-browser';

export function isMotionReduced(): boolean {
  return IS_BROWSER ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : true;
}
