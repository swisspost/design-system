import { EMPTY_VALUES } from './constants';

export function emptyOr<T extends unknown[]>(check: (...args: T) => void) {
  return (...args: T) => {
    const value = args[0];
    if (!EMPTY_VALUES.some(v => v === value)) {
      check(...args);
    }
  };
}
