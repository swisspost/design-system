export function checkExists<T = unknown>(value: T, error: string) {
  const valueIsUndefined = typeof value === 'undefined';
  const valueIsNull = value === null;
  const valueIsNaN = typeof value === 'number' && isNaN(value);

  if (valueIsUndefined || valueIsNull || valueIsNaN) throw new Error(error);
}
