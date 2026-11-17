import type { EffectHandle, RateLimited } from './index';

const noop = () => {};

/**
 * Creates an `EffectHandle` whose `dispose()` method does nothing.
 */
export function createInertHandle(): EffectHandle {
  return Object.freeze({ dispose: noop });
}

/**
 * Creates a `RateLimited` function that never invokes a callback and whose `cancel()` method does
 * nothing.
 */
export function createInertRateLimited<A extends unknown[]>(): RateLimited<A> {
  // A new function is created on every call, so that the shared `noop` is not mutated.
  return Object.freeze(Object.assign((..._args: A) => {}, { cancel: noop }));
}

/**
 * Creates a `ResizeObserver` that never observes anything.
 */
export function createInertResizeObserver(): ResizeObserver {
  return Object.freeze({
    observe: noop,
    unobserve: noop,
    disconnect: noop,
  });
}

/**
 * Creates a `MutationObserver` that never observes anything and has no pending records.
 */
export function createInertMutationObserver(): MutationObserver {
  return Object.freeze({
    observe: noop,
    disconnect: noop,
    takeRecords: () => [],
  });
}
