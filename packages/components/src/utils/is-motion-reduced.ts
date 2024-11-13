export function isMotionReduced(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
