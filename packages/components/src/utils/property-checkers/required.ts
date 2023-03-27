export const EMPTY_VALUES = [undefined, null, ''];

export function required(value: unknown, error: string) {
  if (EMPTY_VALUES.some(v => v === value)) {
    throw new Error(error);
  }
}
