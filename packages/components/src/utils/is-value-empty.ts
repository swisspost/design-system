export function isValueEmpty(value: unknown): boolean {
  return value == null || value === '' || (typeof value === 'number' && isNaN(value));
}
