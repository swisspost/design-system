export function checkPattern(value: unknown, pattern: RegExp, errorMessage: string) {
  if (typeof value !== 'string' || !pattern.test(value)) {
    throw new Error(errorMessage);
  }
}
