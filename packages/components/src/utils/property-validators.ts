export function oneOfValidator<T>(value: T, possibleValues: T[], errorMessage: string) {
  if (!possibleValues.includes(value)) throw new Error(errorMessage);
}

export function booleanValidator(value: unknown, errorMessage: string) {
  if (typeof value !== 'boolean') throw new Error(errorMessage);
}
