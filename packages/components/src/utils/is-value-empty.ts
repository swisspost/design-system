const EMPTY_VALUES = [undefined, null, '', Number.NaN] as const;

export function isValueEmpty(value: unknown): boolean {
  return EMPTY_VALUES.some(v => Object.is(v, value));
}
