export function checkUrl(value: unknown, error: string) {
  if (typeof value !== 'string' && !(value instanceof URL)) throw new Error(error);

  try {
    URL.canParse(value, window.location.origin);
  } catch (e) {
    throw new Error(error);
  }
}
