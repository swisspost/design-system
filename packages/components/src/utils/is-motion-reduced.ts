import { IS_SSR } from './is-ssr';

export function isMotionReduced(): boolean {
  return !IS_SSR ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
}
