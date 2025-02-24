import { EMPTY_VALUES } from './constants';

export function emptyOr<T extends unknown[]>(check: (...args: T) => void) {
  return (...args: T) => {
    const component = args[0];
    const prop = args[1] as string;
    const value = component[prop];

    if (!EMPTY_VALUES.some(v => v === value)) {
      check(...args);
    }
  };
}
