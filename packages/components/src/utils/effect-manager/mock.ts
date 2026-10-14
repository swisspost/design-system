import type { Callable, Cancelable } from './index';

const noop = () => {};

/**
 * Creates a `Cancelable` whose `cancel` method does nothing.
 */
export function createInertCancelable(): Cancelable {
  return Object.freeze({ cancel: noop });
}

/**
 * Returns a `Callable` that never invokes anything and whose `cancel` method does nothing.
 */
export function createInertCallable<C, A extends unknown[]>(): Callable<C, A> {
  return Object.assign(noop, createInertCancelable());
}

/**
 * Returns a `ResizeObserver` that never observes anything.
 */
export function createInertResizeObserver(): ResizeObserver {
  return {
    observe: noop,
    unobserve: noop,
    disconnect: noop,
  };
}

/**
 * Returns a `MutationObserver` that never observes anything and has no pending records.
 */
export function createInertMutationObserver(): MutationObserver {
  return {
    observe: noop,
    disconnect: noop,
    takeRecords: () => [],
  };
}
