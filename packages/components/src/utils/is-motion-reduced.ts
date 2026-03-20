import { Build } from '@stencil/core';

export function isMotionReduced(): boolean {
  return Build.isBrowser ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : true;
}
