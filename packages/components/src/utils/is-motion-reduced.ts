import { Build } from '@stencil/core';

export function isMotionReduced(): boolean {
  return Build.isBrowser ? globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches : true;
}
