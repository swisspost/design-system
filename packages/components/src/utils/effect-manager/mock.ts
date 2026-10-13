import type { Callable, Cancelable } from './index';

const noop = () => {};

export function createInertCancelable(): Cancelable {
  return Object.freeze({ cancel: noop });
}

export function createInertCallable<A extends unknown[]>(): Callable<A> {
  return Object.assign(() => {}, { cancel: noop });
}

export function createInertResizeObserver(): ResizeObserver {
  return {
    observe: noop,
    unobserve: noop,
    disconnect: noop,
  };
}

export function createInertMutationObserver(): MutationObserver {
  return {
    observe: noop,
    disconnect: noop,
    takeRecords: () => [],
  };
}
