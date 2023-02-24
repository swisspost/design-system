export function checkOneOf<T>(value: T, possibleValues: T[], errorMessage: string) {
  if (!possibleValues.includes(value)) throw new Error(errorMessage);
}
