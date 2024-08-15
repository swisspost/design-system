export function checkUrl(value: unknown, error: string) {
  if (typeof value !== 'string' && !(value instanceof URL)) throw new Error(error);

  try {
    new URL(value);
  } catch (e) {
    throw new Error(error);
  }
}
