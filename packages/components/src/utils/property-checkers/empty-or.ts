import { debounce } from 'throttle-debounce';
import { isValueEmpty } from '../is-value-empty';

export function emptyOr<
  T extends { host: HTMLElement },
  K extends keyof T,
  ExtraArgs extends unknown[],
>(check: (component: T, prop: K, ...extraArgs: ExtraArgs) => void) {
  return debounce(100, (component: T, prop: K, ...extraArgs: ExtraArgs) => {
    const value = component[prop];

    if (!isValueEmpty(value)) {
      check(component, prop, ...extraArgs);
    }
  });
}
