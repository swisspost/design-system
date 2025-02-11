export type PropertyType = 'boolean' | 'number' | 'string' | 'array' | 'object' | 'function';

export function checkType(value: unknown, type: PropertyType, error: string) {
  const typeIsArray = type === 'array';
  const valueIsArray = Array.isArray(value);

  if (typeIsArray || valueIsArray) {
    if (valueIsArray !== typeIsArray) {
      throw new Error(error);
    }
  } else if (typeof value !== type) {
    throw new Error(error);
  }
}
