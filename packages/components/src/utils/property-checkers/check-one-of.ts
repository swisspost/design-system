export function checkOneOf<T>(value: T, possibleValues: readonly T[], error: string) {
  if (!possibleValues.includes(value)) {
    throw new Error(error);
  }
}
