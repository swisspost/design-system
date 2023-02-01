const EMPTY_VALUES = [undefined, null, ''];

export function checkType(value: unknown, type: string, errorMessage: string) {
  const lowerCaseType = type.toLowerCase();
  const typeIsArray = lowerCaseType === 'array';
  const valueIsArray = Array.isArray(value);
  
  if (typeIsArray || valueIsArray) {
    if ((typeIsArray && !valueIsArray) || (!typeIsArray && valueIsArray)) throw new Error(errorMessage);
  } else {
    if (typeof value !== lowerCaseType) throw new Error(errorMessage);
  }
}

export function checkEmptyOrType(value: unknown, type: string, errorMessage: string) {
  if (!EMPTY_VALUES.some(v => v === value)) checkType(value, type, errorMessage);
}

export function checkOneOf<T>(value: T, possibleValues: T[], errorMessage: string) {
  if (!possibleValues.includes(value)) throw new Error(errorMessage);
}

export function checkEmptyOrOneOf<T>(value: T, possibleValues: T[], errorMessage: string) {
  if (!EMPTY_VALUES.some(v => v === value)) checkOneOf(value, possibleValues, errorMessage);
}
