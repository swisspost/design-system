export function checkOneOf<T>(value: T, possibleValues: T[], errorMessage: string) {
  if (!possibleValues.includes(value)) throw new Error(errorMessage);
}

export function checkBoolean(value: unknown, errorMessage: string) {
  if (typeof value !== 'boolean') throw new Error(errorMessage);
}

export function checkNonEmptyString(value: unknown, errorMessage: string) {
  if (typeof value !== 'string' || !value.trim().length) throw new Error(errorMessage);
}

export function checkPattern(value: string, pattern: RegExp, errorMessage: string) {
  if (typeof value !== 'string' || !pattern.test(value)) throw new Error(errorMessage);
}
