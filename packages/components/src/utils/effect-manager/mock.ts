import type { EffectHandle, RateLimited } from './index';

const noop = () => {};

/**
 * Creates an `EffectHandle` whose `dispose` method does nothing.
 */
export function createInertHandle(): EffectHandle {
  return Object.freeze({ dispose: noop });
}

/**
 * Creates a `RateLimited` function that never invokes anything and whose `cancel` method does
 * nothing.
 */
export function createInertRateLimited<A extends unknown[]>(): RateLimited<A> {
  return Object.assign(noop, { cancel: noop });
}

/**
 * Creates a `ResizeObserver` that never observes anything.
 */
export function createInertResizeObserver(): ResizeObserver {
  return {
    observe: noop,
    unobserve: noop,
    disconnect: noop,
  };
}

/**
 * Creates a `MutationObserver` that never observes anything and has no pending records.
 */
export function createInertMutationObserver(): MutationObserver {
  return {
    observe: noop,
    disconnect: noop,
    takeRecords: () => [],
  };
}
