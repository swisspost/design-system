export function checkOneOf<T>(value: T, possibleValues: T[], errorMessage: string) {
  if (!possibleValues.includes(value)) throw new Error(errorMessage);
}

export function checkBoolean(value: unknown, errorMessage: string) {
  if (typeof value !== 'boolean') throw new Error(errorMessage);
}
