export function checkOneOf<T>(value: T, possibleValues: T[], error: string) {
  if (!possibleValues.includes(value)) throw new Error(error);
}
