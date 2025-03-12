import { IS_SERVER } from './environment';

export function isMotionReduced(): boolean {
  return !IS_SERVER ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
}
