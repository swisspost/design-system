export function isValueEmpty(value: unknown): boolean {
  const isUndefinedOrNull = value == null;
  const isEmptyString = value === '';
  const isNotANumber = typeof value === 'number' && isNaN(value);

  return isUndefinedOrNull || isEmptyString || isNotANumber;
}
