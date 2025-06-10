import { EMPTY_VALUES } from './constants';

export function requiredAnd<
  T extends { host: HTMLElement },
  K extends keyof T,
  ExtraArgs extends unknown[],
>(check: (component: T, prop: K, ...extraArgs: ExtraArgs) => void) {
  return (component: T, prop: K, ...extraArgs: ExtraArgs) => {
    const componentName = component.host.localName;
    const value = component[prop];
    const message = `The prop \`${String(
      prop,
    )}\` of the \`${componentName}\` component is not defined.`;

    if (EMPTY_VALUES.some(v => v === value)) {
      throw new Error(message);
    } else {
      check(component, prop, ...extraArgs);
    }
  };
}
