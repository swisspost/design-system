import type { Callable, Cancelable } from './index';

const noop = () => {};

/**
 * Creates a `Cancelable` whose `cancel` method does nothing.
 */
export function createInertCancelable(): Cancelable {
  return Object.freeze({ cancel: noop });
}

/**
 * Creates a `Callable` that never invokes anything and whose `cancel` method does nothing.
 */
export function createInertCallable<A extends unknown[]>(): Callable<A> {
  return Object.assign(noop, createInertCancelable());
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
