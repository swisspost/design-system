export function checkContainsOnly<T = unknown>(array: T[], test: (item: T) => boolean, error: string) {
  if (array.length && !array.every(test)) throw new Error(error);
}
