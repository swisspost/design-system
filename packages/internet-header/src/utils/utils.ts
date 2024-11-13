/**
 * Generates a (sequential) unique ID. If prefix is given, the ID is appended to it.
 *
 * @param prefix The value to prefix the ID with
 * @returns Unique ID
 */
export const uniqueId = (() => {
  let num = 0;
  return function (prefix?: string) {
    prefix = prefix || '';
    num += 1;
    return prefix + num;
  };
})();

export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
