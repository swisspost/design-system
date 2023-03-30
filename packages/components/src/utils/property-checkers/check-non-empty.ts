import { EMPTY_VALUES } from './constants';

export function checkNonEmpty(value: unknown, error: string) {
  if (EMPTY_VALUES.some(v => v === value)) {
    throw new Error(error);
  }
}
