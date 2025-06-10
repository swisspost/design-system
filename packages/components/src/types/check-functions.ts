export type CheckOneOfFn<T extends { host: HTMLElement }, K extends keyof T> = (
  component: T,
  prop: K,
  customMessage?: string,
  possibleValues?: readonly unknown[],
) => void;

export type CheckPatternFn<T extends { host: HTMLElement }, K extends keyof T> = (
  component: T,
  prop: K,
  customMessage?: string,
  pattern?: RegExp,
) => void;

export type CheckTypeFn<T extends { host: HTMLElement }, K extends keyof T> = (
  component: T,
  prop: K,
  customMessage?: string,
  expectedType?: string,
) => void;
