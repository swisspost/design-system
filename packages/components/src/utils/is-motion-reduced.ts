export function isMotionReduced(): boolean {
  return globalThis.matchMedia
    ? globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
    : true;
}
