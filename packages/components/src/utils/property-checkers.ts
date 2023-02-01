export function checkType(value: unknown, type: string, errorMessage: string) {
  if (typeof value !== type) throw new Error(errorMessage);
}

export function checkEmptyOrType(value: unknown, type: string, errorMessage: string) {
  if (value !== undefined) checkType(value, type, errorMessage);
}

export function checkOneOf<T>(value: T, possibleValues: T[], errorMessage: string) {
  if (!possibleValues.includes(value)) throw new Error(errorMessage);
}

export function checkEmptyOrOneOf<T>(value: T, possibleValues: T[], errorMessage: string) {
  if (value !== undefined) checkOneOf(value, possibleValues, errorMessage);
}
